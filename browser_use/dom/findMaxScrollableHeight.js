() => {
  const element = document.body;
  const skipTags = new Set(['SCRIPT', 'STYLE', 'HEAD', 'LINK', 'META']);
  let maxHeight = 0;
  
  function isScrollable(el) {
      const style = window.getComputedStyle(el);
      const hasScroll = el.scrollHeight > el.clientHeight;
      const hasScrollStyle = ['auto', 'scroll'].includes(style.overflowY) ||
                           ['auto', 'scroll'].includes(style.overflow);
      return hasScroll && hasScrollStyle;
  }
  
  function getElementHeight(el) {
      if (!el) return 0;
      
      // Get the full scroll height for scrollable elements
      if (isScrollable(el)) {
          return el.scrollHeight;
      }
      
      // For non-scrollable elements, get their rendered height
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const margins = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      return rect.height + margins;
  }
  
  function traverse(el) {
      if (!el || skipTags.has(el.tagName)) return;
      
      const height = getElementHeight(el);
      maxHeight = Math.max(maxHeight, height);
      
      for (const child of el.children) {
          traverse(child);
      }
  }
  
  traverse(element);
  return Math.round(maxHeight);
}