import './Header.css';

const Header = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo">小野軽送</h1>
                <nav className="nav">
                    <button onClick={() => scrollToSection('services')}>業務内容</button>
                    <button onClick={() => scrollToSection('area')}>対応地域</button>
                    <button onClick={() => scrollToSection('pricing')}>料金表</button>
                    <button onClick={() => scrollToSection('contact')}>お問い合わせ</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
