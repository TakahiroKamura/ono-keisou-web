import './Hero.css';

const Hero = () => {
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">小野軽送</h1>
                <p className="hero-subtitle">
                    信頼と丁寧さで、あなたの大切な荷物を運びます
                </p>
                <p className="hero-description">
                    軽貨物運送のプロフェッショナルとして、<br />
                    お客様のニーズに柔軟に対応いたします
                </p>
                <button className="cta-button" onClick={scrollToContact}>
                    お問い合わせ
                </button>
            </div>
        </section>
    );
};

export default Hero;
