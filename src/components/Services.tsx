import './Services.css';

const Services = () => {
    const services = [
        {
            title: '配送・運搬',
            description: '小型から中型の荷物まで、迅速かつ丁寧に配送いたします',
            icon: '🚚',
        },
        {
            title: '引っ越しサポート',
            description: '単身・小規模引っ越しに対応。荷物の運搬をお手伝いします',
            icon: '📦',
        },
        {
            title: '緊急配送',
            description: 'お急ぎの配送にも柔軟に対応。ご相談ください',
            icon: '⚡',
        },
        {
            title: '定期便',
            description: '定期的な配送ニーズにも対応可能です',
            icon: '📅',
        },
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <h2 className="section-title">業務内容</h2>
                <p className="section-subtitle">
                    お客様のさまざまなニーズにお応えします
                </p>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
