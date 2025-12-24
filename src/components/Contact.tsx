import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title">お問い合わせ</h2>
                <p className="section-subtitle">
                    お気軽にご連絡ください
                </p>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <div className="contact-details">
                                <h3>お電話</h3>
                                <p className="contact-value">090-XXXX-XXXX</p>
                                <p className="contact-note">受付時間: 8:00 〜 20:00</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">✉️</div>
                            <div className="contact-details">
                                <h3>メール</h3>
                                <p className="contact-value">info@ono-keisou.example</p>
                                <p className="contact-note">24時間受付</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">💬</div>
                            <div className="contact-details">
                                <h3>LINE</h3>
                                <p className="contact-value">@ono-keisou</p>
                                <p className="contact-note">お気軽にメッセージを</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-wrapper">
                        <div className="contact-form">
                            <h3>お見積もり・ご相談フォーム</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">お名前 *</label>
                                    <input type="text" id="name" name="name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">メールアドレス *</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">電話番号</label>
                                    <input type="tel" id="phone" name="phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">ご要望・お問い合わせ内容 *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-button">
                                    送信する
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
