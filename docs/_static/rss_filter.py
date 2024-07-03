import os
from mkdocs.plugins import BasePlugin
from mkdocs.structure.pages import Page

class RSSFilterPlugin(BasePlugin):
    def on_page_context(self, context, page, config, nav):
        if not page.file.src_path.startswith("News/"):
            return None
        return context
