document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const quoteBtn = document.getElementById('quoteBtn');
  const quoteContent = document.getElementById('quoteContent');
  const jokeBtn = document.getElementById('jokeBtn');
  const jokeContent = document.getElementById('jokeContent');
  const momentForm = document.getElementById('momentForm');
  const momentInput = document.getElementById('momentInput');
  const momentsList = document.getElementById('momentsList');
  const toast = document.getElementById('toast');

  // Load moments on page load
  loadMoments();

  // Get random quote
  quoteBtn.addEventListener('click', async function() {
    try {
      quoteContent.innerHTML = '<span class="loading">加载中...</span>';
      const res = await fetch('/api/quote');
      const data = await res.json();
      if (data.success) {
        quoteContent.textContent = data.data;
      } else {
        showToast('获取语录失败了，再试试吧~');
        quoteContent.textContent = '点击按钮获取一句温暖的小语录~';
      }
    } catch (err) {
      showToast('网络出错了，再试试吧~');
      quoteContent.textContent = '点击按钮获取一句温暖的小语录~';
    }
  });

  // Get random joke
  jokeBtn.addEventListener('click', async function() {
    try {
      jokeContent.innerHTML = '<span class="loading">加载中...</span>';
      const res = await fetch('/api/joke');
      const data = await res.json();
      if (data.success) {
        jokeContent.textContent = data.data;
      } else {
        showToast('获取笑话失败了，再试试吧~');
        jokeContent.textContent = '点击按钮来个小笑话，赶走不开心~';
      }
    } catch (err) {
      showToast('网络出错了，再试试吧~');
      jokeContent.textContent = '点击按钮来个小笑话，赶走不开心~';
    }
  });

  // Submit moment
  momentForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const content = momentInput.value.trim();
    if (!content) {
      showToast('内容不能为空哦~');
      return;
    }

    try {
      const res = await fetch('/api/moments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (data.success) {
        showToast('记录成功啦！谢谢你的分享~');
        momentInput.value = '';
        loadMoments(); // Reload the list
      } else {
        showToast(data.message || '提交失败了，再试试吧~');
      }
    } catch (err) {
      showToast('网络出错了，再试试吧~');
    }
  });

  // Load all moments
  async function loadMoments() {
    try {
      momentsList.innerHTML = '<div class="loading">加载中...</div>';
      const res = await fetch('/api/moments');
      const data = await res.json();
      if (data.success) {
        if (data.data.length === 0) {
          momentsList.innerHTML = '<div class="empty-state">还没有开心小事，快来分享第一个吧~</div>';
        } else {
          momentsList.innerHTML = '';
          data.data.forEach(moment => {
            const item = document.createElement('div');
            item.className = 'moment-item';
            item.innerHTML = `
              <div class="moment-content">${escapeHtml(moment.content)}</div>
              <div class="moment-time">${moment.time}</div>
            `;
            momentsList.appendChild(item);
          });
        }
      } else {
        momentsList.innerHTML = '<div class="empty-state">加载失败了，刷新页面试试吧~</div>';
      }
    } catch (err) {
      momentsList.innerHTML = '<div class="empty-state">网络出错了，刷新页面试试吧~</div>';
    }
  }

  // Simple XSS escape
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Show toast message
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Initial load default quote and joke
  quoteBtn.click();
  jokeBtn.click();
});
