# 🧪 Testing Guide - Focus & Smile Chrome Extension

## 🚀 Quick Test Instructions

### 1. Build the Extension
```bash
npm run build
```

### 2. Load in Chrome (Development)
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist/` folder from your project
5. The extension should appear in your extensions list

### 3. Test the Extension
1. Click the extension icon in Chrome toolbar
2. The popup should open with the Focus & Smile interface
3. Test all functionality:
   - ✅ Timer starts/stops/resets
   - ✅ Settings modal opens
   - ✅ Tabs switch properly
   - ✅ Dark mode toggle works
   - ✅ No console errors

## 🔧 Troubleshooting

### If you see "MIME type" errors:
This has been fixed in the latest build configuration. The extension now uses:
- **IIFE format** instead of ES modules
- **Proper script loading** without module type
- **Chrome extension compatible** build output

### If the popup doesn't open:
1. Check the manifest.json is in dist/
2. Verify popup.js exists in dist/
3. Check Chrome developer tools for errors
4. Try reloading the extension

### If styles don't load:
The CSS is now bundled with the JavaScript, so styles should load automatically when the script runs.

## 📱 Testing Checklist

### ✅ Core Functionality
- [ ] Timer displays correctly
- [ ] Start/pause/reset buttons work
- [ ] Session types change properly
- [ ] Progress bar updates
- [ ] Sound notifications work

### ✅ UI/UX Features
- [ ] Modern design loads properly
- [ ] Animations work smoothly
- [ ] Hover effects function
- [ ] Responsive layout works
- [ ] Dark mode toggle functions

### ✅ Settings & Data
- [ ] API key modal opens/closes
- [ ] Settings persist between sessions
- [ ] Quotes load and display
- [ ] Local storage works

### ✅ Chrome Extension Specific
- [ ] Popup opens without errors
- [ ] Extension icon displays
- [ ] Permissions work correctly
- [ ] No CSP violations

## 🐛 Common Issues & Solutions

### Issue: Extension won't load
**Solution:** Check that all files are in dist/ folder and manifest.json is valid

### Issue: Popup is too small
**Solution:** The HTML now includes minimum dimensions (400x600px)

### Issue: Fonts don't load
**Solution:** Google Fonts are loaded via CDN in the HTML head

### Issue: API calls fail
**Solution:** Ensure API key is set in extension settings

## 🎯 Performance Testing

### Load Time
- Extension should load in < 1 second
- UI should be responsive immediately
- No blocking operations on startup

### Memory Usage
- Check Chrome Task Manager for memory usage
- Should be < 50MB for normal operation
- No memory leaks during extended use

## 📦 Production Testing

Before submitting to Chrome Web Store:

1. **Test in Incognito Mode**
2. **Test with different screen sizes**
3. **Test all user flows**
4. **Verify no development code remains**
5. **Check all permissions are necessary**

---

## 🎉 Ready for Chrome Web Store!

Once all tests pass, your extension is ready for submission to the Chrome Web Store. The modern UI/UX design will make a great impression on users!

*Happy testing! 🚀*