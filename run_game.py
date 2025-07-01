#!/usr/bin/env python3

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

def start_server():
    """Start the HTTP server"""
    PORT = 8000
    
    # Change to the directory containing the game files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Pool game server running at http://localhost:{PORT}")
            print("Press Ctrl+C to stop the server")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"Port {PORT} is already in use. Try a different port or stop the existing server.")
        else:
            print(f"Error starting server: {e}")
        sys.exit(1)

def open_browser():
    """Open the game in the default browser after a short delay"""
    time.sleep(1)  # Wait for server to start
    
    # Check if we're in WSL
    is_wsl = 'microsoft' in os.uname().release.lower()
    
    if is_wsl:
        # In WSL, try to open with Windows browser
        try:
            os.system('cmd.exe /c start http://localhost:8000')
            print("Opening game in Windows browser...")
        except Exception:
            print("Please manually open http://localhost:8000 in your Windows browser")
    else:
        try:
            webbrowser.open('http://localhost:8000')
            print("Opening game in your default browser...")
        except Exception as e:
            print(f"Could not open browser automatically: {e}")
            print("Please manually open http://localhost:8000 in your browser")

if __name__ == "__main__":
    print("Starting Simple Pool Game...")
    
    # Check if required files exist
    required_files = ['index.html', 'style.css', 'game.js']
    missing_files = [f for f in required_files if not os.path.exists(f)]
    
    if missing_files:
        print(f"Error: Missing required files: {', '.join(missing_files)}")
        sys.exit(1)
    
    # Start browser in a separate thread
    browser_thread = threading.Thread(target=open_browser, daemon=True)
    browser_thread.start()
    
    # Start the server (this will block)
    start_server()