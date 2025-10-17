// 乐理学习中心交互式组件功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const startLearningBtn = document.getElementById('startLearningBtn');
    const identityModal = document.getElementById('identityModal');
    const confirmModal = document.getElementById('confirmModal');
    const identityCards = document.querySelectorAll('.identity-card');
    const backBtn = document.getElementById('backBtn');
    const nextChapterBtn = document.getElementById('nextChapterBtn');
    const confirmTitle = document.getElementById('confirmTitle');
    const confirmMessage = document.getElementById('confirmMessage');
    
    // 音频元素
    const backgroundMusic = new Audio('../UserMusic/ChiliChill-A cup of coffee.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    
    // 当前选择的身份
    let selectedIdentity = null;
    
    // 显示身份选择模态框
    function showIdentityModal() {
        identityModal.classList.add('active');
    }
    
    // 隐藏身份选择模态框
    function hideIdentityModal() {
        identityModal.classList.remove('active');
    }
    
    // 显示确认模态框
    function showConfirmModal() {
        confirmModal.classList.add('active');
    }
    
    // 隐藏确认模态框
    function hideConfirmModal() {
        confirmModal.classList.remove('active');
    }
    
    // 处理身份卡片选择
    function handleIdentitySelection(card) {
        // 移除所有卡片的选中状态
        identityCards.forEach(c => c.classList.remove('selected'));
        
        // 添加选中状态到当前卡片
        card.classList.add('selected');
        
        // 保存选择的身份
        selectedIdentity = card.dataset.identity;
        
        // 更新确认模态框内容
        updateConfirmModal();
    }
    
    // 更新确认模态框内容
    function updateConfirmModal() {
        if (selectedIdentity === 'enthusiast') {
            confirmTitle.textContent = '欢迎，音乐爱好者！';
            confirmMessage.innerHTML = `
                <p><strong>为什么音乐爱好者需要学习乐理？</strong></p>
                <p>乐理能帮助你：</p>
                <ul style="text-align: left; margin: 10px 0;">
                    <li>更好地理解你喜欢的音乐</li>
                    <li>提升音乐欣赏能力</li>
                    <li>为即兴演奏和创作打下基础</li>
                    <li>与其他音乐爱好者交流更有深度</li>
                </ul>
                <p>我们将为您提供轻松有趣的学习体验，专注于音乐欣赏和基础理论。</p>
            `;
        } else if (selectedIdentity === 'professional') {
            confirmTitle.textContent = '欢迎，音乐专业生！';
            confirmMessage.innerHTML = `
                <p><strong>为什么音乐专业生需要深入学习乐理？</strong></p>
                <p>乐理是专业音乐学习的基石：</p>
                <ul style="text-align: left; margin: 10px 0;">
                    <li>为专业考试和比赛做准备</li>
                    <li>理解复杂的音乐作品结构</li>
                    <li>提升作曲和编曲能力</li>
                    <li>建立系统的音乐知识体系</li>
                </ul>
                <p>我们将为您提供系统深入的学习内容，包含专业理论和实践技巧。</p>
            `;
        }
    }
    
    // 进入下一章节
    function goToNextChapter() {
        // 隐藏确认模态框
        hideConfirmModal();
        
        // 直接进入下一章节
        alert('下一章节内容正在开发中...');
    }
    
    // 事件监听器
    startLearningBtn.addEventListener('click', function() {
        // 显示身份选择模态框
        showIdentityModal();
    });
    
    // 身份卡片点击事件
    identityCards.forEach(card => {
        card.addEventListener('click', function() {
            handleIdentitySelection(this);
            
            // 短暂延迟后显示确认模态框
            setTimeout(() => {
                hideIdentityModal();
                showConfirmModal();
            }, 300);
        });
    });
    
    // 返回按钮事件
    backBtn.addEventListener('click', function() {
        hideConfirmModal();
        showIdentityModal();
    });
    
    // 进入下一章节按钮事件
    nextChapterBtn.addEventListener('click', goToNextChapter);
    
    // 点击模态框外部关闭
    identityModal.addEventListener('click', function(e) {
        if (e.target === identityModal) {
            hideIdentityModal();
        }
    });
    
    confirmModal.addEventListener('click', function(e) {
        if (e.target === confirmModal) {
            hideConfirmModal();
        }
    });
    
    // 键盘事件支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭模态框
        if (e.key === 'Escape') {
            if (identityModal.classList.contains('active')) {
                hideIdentityModal();
            }
            if (confirmModal.classList.contains('active')) {
                hideConfirmModal();
            }
        }
        
        // 回车键确认选择
        if (e.key === 'Enter' && confirmModal.classList.contains('active')) {
            goToNextChapter();
        }
    });
    
    // 播放背景音乐
    function playBackgroundMusic() {
        // 设置音频为静音，然后播放，这样可以绕过自动播放限制
        backgroundMusic.muted = true;
        backgroundMusic.play().then(() => {
            // 播放成功后取消静音
            backgroundMusic.muted = false;
            console.log('背景音乐开始播放');
        }).catch(error => {
            console.log('音频播放失败:', error);
            // 如果静音播放也失败，尝试在用户交互时播放
            document.addEventListener('click', function startMusicOnClick() {
                backgroundMusic.play().then(() => {
                    backgroundMusic.muted = false;
                });
                document.removeEventListener('click', startMusicOnClick);
            }, { once: true });
        });
    }
    
    // 页面加载完成后开始播放音乐
    playBackgroundMusic();
    
    console.log('乐理学习中心交互式组件已初始化');
});
