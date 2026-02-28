// 手动执行React应用
console.log('=== main.js loaded ===');

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  console.log('=== DOMContentLoaded in main.js ===');
  
  // 检查React应用是否已经加载
  if (typeof Qf !== 'undefined' && typeof S !== 'undefined' && typeof td !== 'undefined') {
    console.log('React app is available');
    
    try {
      const root = document.getElementById('root');
      if (root) {
        console.log('Rendering React app...');
        Qf.createRoot(root).render(S.jsx(td, {}));
        console.log('React app rendered successfully!');
        
        // 更新调试信息
        const statusElement = document.getElementById('status');
        if (statusElement) {
          statusElement.textContent = 'React应用渲染成功！';
        }
      } else {
        console.error('Root element not found');
      }
    } catch (error) {
      console.error('Error rendering React app:', error);
      
      // 更新调试信息
      const statusElement = document.getElementById('status');
      if (statusElement) {
        statusElement.textContent = 'React应用渲染失败: ' + error.message;
      }
    }
  } else {
    console.error('React app is not available');
    
    // 更新调试信息
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = 'React应用未加载';
    }
  }
});
