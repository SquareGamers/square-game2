# server.py - MiniFlask (no external deps)
import json, mimetypes, os
from wsgiref.simple_server import make_server

class MiniFlask:
    def __init__(self, static_folder='frontend', host='127.0.0.1', port=5000):
        self.routes = {}
        self.static_folder = static_folder
        self.host = host
        self.port = port

    def route(self, path, methods=['GET']):
        def decorator(fn):
            for m in methods:
                self.routes[(path, m.upper())] = fn
            return fn
        return decorator

    def serve_static(self, path):
        if path == '/':
            path = '/index.html'
        full = os.path.join(self.static_folder, path.lstrip('/'))
        if not os.path.exists(full) or not os.path.isfile(full):
            return None, None
        mime, _ = mimetypes.guess_type(full)
        with open(full, 'rb') as f:
            data = f.read()
        return data, mime or 'application/octet-stream'

    def parse_json(self, environ):
        try:
            size = int(environ.get('CONTENT_LENGTH', '0'))
        except (ValueError, TypeError):
            size = 0
        if size:
            body = environ['wsgi.input'].read(size)
            try:
                return json.loads(body.decode('utf-8'))
            except Exception:
                return None
        return None

    def __call__(self, environ, start_response):
        path = environ.get('PATH_INFO', '/')
        method = environ.get('REQUEST_METHOD', 'GET').upper()

        key = (path, method)
        if key in self.routes:
            try:
                result = self.routes[key](environ)
                # normalize result -> body (bytes), status, headers
                status = '200 OK'
                headers = []
                body = result
                if isinstance(result, tuple) and len(result) == 3:
                    body, status, headers = result
                if isinstance(body, (dict, list)):
                    body = json.dumps(body).encode('utf-8')
                    headers.append(('Content-Type', 'application/json; charset=utf-8'))
                elif isinstance(body, str):
                    body = body.encode('utf-8')
                    headers.append(('Content-Type', 'text/plain; charset=utf-8'))
                elif isinstance(body, bytes):
                    if not any(h[0].lower() == 'content-type' for h in headers):
                        headers.append(('Content-Type', 'application/octet-stream'))
                # simple CORS for local dev (remove or lock down later)
                headers.append(('Access-Control-Allow-Origin', '*'))
                start_response(status, headers)
                return [body]
            except Exception as e:
                start_response('500 Internal Server Error', [('Content-Type','text/plain')])
                return [f'Internal Server Error: {e}'.encode('utf-8')]

        # static file fallback
        data, mime = self.serve_static(path)
        if data is not None:
            start_response('200 OK', [('Content-Type', mime)])
            return [data]

        start_response('404 Not Found', [('Content-Type','text/plain')])
        return [b'Not Found']

    def run(self, host=None, port=None):
        if host:
            self.host = host
        if port:
            self.port = port

        print(f"Starting server at http://{self.host}:{self.port}")
        with make_server(self.host, self.port, self) as httpd:
            httpd.serve_forever()

# create app
app = MiniFlask(static_folder='frontend')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
