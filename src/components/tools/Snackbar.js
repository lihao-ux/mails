class Snackbar {
    constructor() {
        this.snackbar = null;
        this.timeout = null;
        this.init();
    }

    init() {
        // 创建提示框元素
        this.snackbar = document.createElement('div');
        this.snackbar.style.position = 'fixed';
        this.snackbar.style.top = '20px';
        this.snackbar.style.left = '50%';
        this.snackbar.style.transform = 'translateX(-50%)';
        this.snackbar.style.padding = '12px 24px';
        this.snackbar.style.borderRadius = '4px';
        this.snackbar.style.color = 'white';
        this.snackbar.style.boxShadow = '0 3px 5px rgba(0,0,0,0.2)';
        this.snackbar.style.zIndex = '1000';
        this.snackbar.style.opacity = '0';
        this.snackbar.style.transition = 'opacity 0.3s ease';
        this.snackbar.style.display = 'none';

        document.body.appendChild(this.snackbar);
    }

    show(message, type = 'success') {
        // 清除之前的定时器
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // 设置样式和内容
        this.snackbar.textContent = message;
        this.snackbar.style.display = 'block';

        // 根据类型设置背景色
        switch(type) {
            case 'success':
                this.snackbar.style.backgroundColor = '#4caf50';
                break;
            case 'error':
                this.snackbar.style.backgroundColor = '#f44336';
                break;
            case 'warning':
                this.snackbar.style.backgroundColor = '#ff9800';
                break;
            case 'info':
                this.snackbar.style.backgroundColor = '#2196f3';
                break;
            default:
                this.snackbar.style.backgroundColor = '#4caf50';
        }

        // 显示提示框
        setTimeout(() => {
            this.snackbar.style.opacity = '1';
        }, 10);

        // 自动隐藏
        this.timeout = setTimeout(() => {
            this.hide();
        }, 3000);
    }

    hide() {
        this.snackbar.style.opacity = '0';
        setTimeout(() => {
            this.snackbar.style.display = 'none';
        }, 300);
    }
}

// 创建单例
const snackbar = new Snackbar();

// 导出实例
export default snackbar;