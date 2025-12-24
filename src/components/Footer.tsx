import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>小野軽送</h3>
                        <p>信頼と丁寧さで、お客様の大切な荷物を運びます</p>
                    </div>
                    <div className="footer-section">
                        <h4>営業時間</h4>
                        <p>8:00 〜 20:00</p>
                        <p>年中無休（年末年始を除く）</p>
                    </div>
                    <div className="footer-section">
                        <h4>お問い合わせ</h4>
                        <p>📞 090-XXXX-XXXX</p>
                        <p>✉️ info@ono-keisou.example</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 小野軽送. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
