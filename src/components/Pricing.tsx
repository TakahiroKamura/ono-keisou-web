import './Pricing.css';

const Pricing = () => {
    const pricingPlans = [
        {
            title: '近距離配送',
            price: '3,000円〜',
            description: '市内・近隣地域への配送',
            features: [
                '10km圏内',
                '小型〜中型荷物',
                '即日対応可能',
            ],
        },
        {
            title: '中距離配送',
            price: '5,000円〜',
            description: '県内・近隣県への配送',
            features: [
                '50km圏内',
                '中型荷物',
                '時間指定可能',
            ],
            highlighted: true,
        },
        {
            title: '引っ越しサポート',
            price: '8,000円〜',
            description: '単身・小規模引っ越し',
            features: [
                '荷物の運搬',
                '簡易的な梱包サポート',
                '柔軟な時間対応',
            ],
        },
    ];

    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <h2 className="section-title">料金表</h2>
                <p className="section-subtitle">
                    明確でわかりやすい料金設定
                </p>
                <div className="pricing-grid">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
                        >
                            {plan.highlighted && <div className="badge">おすすめ</div>}
                            <h3 className="pricing-title">{plan.title}</h3>
                            <div className="pricing-price">{plan.price}</div>
                            <p className="pricing-description">{plan.description}</p>
                            <ul className="pricing-features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="pricing-note">
                    <p>
                        ※ 料金は目安です。荷物の量、距離、時間帯により変動いたします。
                    </p>
                    <p>
                        詳しくはお問い合わせください。お見積もりは無料です。
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
