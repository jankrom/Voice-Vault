import os
import time
import threading
import configparser

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class ConfigReloader:
    """
    A class that monitors and periodically reloads a configuration (INI) file.
    
    - Uses watchdog to detect file modifications and trigger an immediate reload.
    - Uses a background thread to periodically reload on a specified time interval.
    """

    def __init__(self, config_file_path, reload_interval=5):
        """
        Initializes the ConfigReloader.

        Args:
            config_file_path (str): Path to the INI configuration file to watch.
            reload_interval (int): Interval (in seconds) for periodic reload checks.
        """
        self.config_file_path = os.path.abspath(config_file_path)
        self.reload_interval = reload_interval
        
        # Initialize configparser to hold the configuration
        self.config = configparser.ConfigParser()
        self.load_config()

        # Create a watchdog event handler
        self.event_handler = _ConfigFileEventHandler(self)
        self.observer = Observer()
        
        # Schedule the observer to watch the directory containing the config file
        watch_directory = os.path.dirname(self.config_file_path) or "."
        self.observer.schedule(
            self.event_handler,
            path=watch_directory,
            recursive=False
        )
        self.observer.start()

        # Create and start a background thread for periodic reload
        self.stop_event = threading.Event()
        self.reload_thread = threading.Thread(
            target=self._periodic_reload_loop,
            daemon=True
        )
        self.reload_thread.start()

    def load_config(self):
        """
        Loads or reloads the configuration from the file.
        """
        self.config.read(self.config_file_path)

    def _periodic_reload_loop(self):
        """
        Periodically reload the config based on the specified reload_interval.
        """
        while not self.stop_event.is_set():
            time.sleep(self.reload_interval)
            self.load_config()

    def get(self, section, option, fallback=None):
        """
        A convenience method for accessing the configuration values.
        
        Args:
            section (str): INI file section name.
            option (str): INI file option (key) name.
            fallback (any): Value to return if option is not found.

        Returns:
            str or fallback: The value of the config option, or fallback if not found.
        """
        if self.config.has_section(section):
            return self.config.get(section, option, fallback=fallback)
        return fallback

    def stop(self):
        """
        Stops the watchdog observer and the periodic reload thread gracefully.
        """
        self.stop_event.set()
        self.observer.stop()
        self.observer.join()
        self.reload_thread.join()


class _ConfigFileEventHandler(FileSystemEventHandler):
    """
    A private event handler class that triggers a reload when the config file is modified.
    """
    def __init__(self, reloader):
        super().__init__()
        self.reloader = reloader

    def on_modified(self, event):
        # Check if the modified file is the config file we're monitoring
        if os.path.abspath(event.src_path) == self.reloader.config_file_path:
            self.reloader.load_config()
