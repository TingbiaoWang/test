// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initFormSwitching();
    initPasswordToggles();
    initPasswordStrength();
    initFormValidation();
    initSocialButtons();
    
    // 显示登录表单
    showForm('login');
});

// 表单切换功能
function initFormSwitching() {
    const switchButtons = document.querySelectorAll('.switch-form');
    
    switchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-target');
            showForm(targetForm);
            
            // 显示切换成功的通知
            showNotification(
                targetForm === 'login' 
                    ? '已切换到登录界面' 
                    : '已切换到注册界面',
                'success'
            );
        });
    });
}

// 显示指定表单
function showForm(formType) {
    // 隐藏所有表单
    document.querySelectorAll('.form-box').forEach(form => {
        form.classList.remove('active');
    });
    
    // 显示目标表单
    const targetForm = document.getElementById(formType + 'Form');
    if (targetForm) {
        targetForm.classList.add('active');
        
        // 重置表单
        const formElement = document.getElementById(formType + 'FormElement');
        if (formElement) {
            formElement.reset();
        }
        
        // 重置密码强度指示器
        if (formType === 'register') {
            updatePasswordStrength('');
        }
    }
}

// 密码显示/隐藏切换
function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inputId = this.id.replace('toggle', '').replace('Password', '');
            const input = document.getElementById(inputId + 'Password');
            
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                // 切换图标
                const icon = this.querySelector('i');
                if (type === 'text') {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }
        });
    });
}

// 密码强度检测
function initPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
}

function updatePasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('passwordStrengthText');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let color = '#e74c3c'; // 红色
    let text = '密码强度：弱';
    
    // 检查密码长度
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    
    // 检查字符类型
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 25;
    
    // 限制最大强度为100%
    strength = Math.min(strength, 100);
    
    // 根据强度设置颜色和文本
    if (strength >= 75) {
        color = '#2ecc71'; // 绿色
        text = '密码强度：强';
    } else if (strength >= 50) {
        color = '#f39c12'; // 橙色
        text = '密码强度：中等';
    } else if (strength >= 25) {
        color = '#f1c40f'; // 黄色
        text = '密码强度：一般';
    }
    
    // 更新UI
    strengthBar.style.width = strength + '%';
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

// 表单验证
function initFormValidation() {
    // 登录表单验证
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            
            // 简单验证
            if (!username || !password) {
                showNotification('请输入用户名和密码', 'error');
                return;
            }
            
            // 模拟登录过程
            simulateLogin(username, password);
        });
    }
    
    // 注册表单验证
    const registerForm = document.getElementById('registerFormElement');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value.trim();
            const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            // 验证用户名
            if (username.length < 3) {
                showNotification('用户名至少需要3个字符', 'error');
                return;
            }
            
            // 验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 验证密码
            if (password.length < 8) {
                showNotification('密码至少需要8个字符', 'error');
                return;
            }
            
            // 验证确认密码
            if (password !== confirmPassword) {
                showNotification('两次输入的密码不一致', 'error');
                return;
            }
            
            // 验证条款同意
            if (!agreeTerms) {
                showNotification('请同意服务条款和隐私政策', 'error');
                return;
            }
            
            // 模拟注册过程
            simulateRegister(username, email, password);
        });
    }
}

// 模拟登录过程
function simulateLogin(username, password) {
    const loginBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = loginBtn.innerHTML;
    
    // 显示加载状态
    loginBtn.innerHTML = '<span class="loading"></span> 登录中...';
    loginBtn.disabled = true;
    
    // 模拟API调用延迟
    setTimeout(() => {
        // 重置按钮状态
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
        
        // 显示成功消息
        showNotification(`欢迎回来，${username}！登录成功`, 'success');
        
        // 在实际应用中，这里会重定向到用户仪表板
        console.log('登录成功:', { username, password });
        
        // 如果勾选了"记住我"
        const rememberMe = document.getElementById('rememberMe').checked;
        if (rememberMe) {
            localStorage.setItem('rememberedUser', username);
        }
    }, 1500);
}

// 模拟注册过程
function simulateRegister(username, email, password) {
    const registerBtn = registerForm.querySelector('button[type="submit"]');
    const originalText = registerBtn.innerHTML;
    
    // 显示加载状态
    registerBtn.innerHTML = '<span class="loading"></span> 注册中...';
    registerBtn.disabled = true;
    
    // 模拟API调用延迟
    setTimeout(() => {
        // 重置按钮状态
        registerBtn.innerHTML = originalText;
        registerBtn.disabled = false;
        
        // 显示成功消息
        showNotification(`恭喜 ${username}，注册成功！请检查您的邮箱 ${email} 完成验证`, 'success');
        
        // 在实际应用中，这里会发送验证邮件并重定向
        console.log('注册成功:', { username, email, password });
        
        // 自动切换到登录界面
        setTimeout(() => {
            showForm('login');
            // 自动填充用户名
            document.getElementById('loginUsername').value = username;
        }, 2000);
    }, 2000);
}

// 社交登录按钮
function initSocialButtons() {
    // Google登录
    const googleBtn = document.querySelector('.btn-social.google');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            showNotification('正在跳转到Google登录...', 'warning');
            // 在实际应用中，这里会重定向到Google OAuth
            console.log('Google登录点击');
        });
    }
    
    // GitHub登录
    const githubBtn = document.querySelector('.btn-social.github');
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            showNotification('正在跳转到GitHub登录...', 'warning');
            // 在实际应用中，这里会重定向到GitHub OAuth
            console.log('GitHub登录点击');
        });
    }
    
    // 忘记密码
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('请输入您的邮箱地址以重置密码:');
            if (email) {
                showNotification(`重置密码链接已发送到 ${email}，请查收`, 'success');
                console.log('重置密码请求:', email);
            }
        });
    }
}

// 显示通知
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    if (!notification || !messageElement) return;
    
    // 设置消息和类型
    messageElement.textContent = message;
    notification.className = 'notification ' + type;
    
    // 显示通知
    notification.style.display = 'flex';
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// 检查是否有记住的用户
function checkRememberedUser() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('loginUsername').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
}

// 初始化时检查记住的用户
checkRememberedUser();

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl + L 切换到登录
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        showForm('login');
        showNotification('已切换到登录界面 (Ctrl+L)', 'success');
    }
    
    // Ctrl + R 切换到注册
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        showForm('register');
        showNotification('已切换到注册界面 (Ctrl+R)', 'success');
    }
    
    // Esc 键清除所有表单
    if (e.key === 'Escape') {
        document.querySelectorAll('form').forEach(form => form.reset());
        updatePasswordStrength('');
        showNotification('已清除所有表单内容', 'warning');
    }
});

// 添加表单输入实时验证
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        validateInput(this);
    });
    
    input.addEventListener('input', function() {
        clearInputError(this);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    const inputGroup = input.closest('.input-group');
    
    if (!inputGroup) return;
    
    // 清除之前的错误状态
    clearInputError(input);
    
    // 检查必填字段
    if (input.hasAttribute('required') && !value) {
        showInputError(input, '此字段为必填项');
        return;
    }
    
    // 邮箱验证
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, '请输入有效的邮箱地址');
            return;
        }
    }
    
    // 用户名验证
    if (input.id === 'registerUsername' && value.length < 3) {
        showInputError(input, '用户名至少需要3个字符');
        return;
    }
    
    // 密码验证
    if (input.type === 'password' && value.length < 8 && value.length > 0) {
        showInputError(input, '密码至少需要8个字符');
        return;
    }
}

function showInputError(input, message) {
    const inputGroup = input.closest('.input-group');
    if (!inputGroup) return;
    
    inputGroup.classList.add('error');
    
    // 创建或更新错误消息
    let errorElement = inputGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearInputError(input) {
    const inputGroup = input.closest('.input-group');
    if (!inputGroup) return;
    
    inputGroup.classList.remove('error');
    
    const errorElement = inputGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}