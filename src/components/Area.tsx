import './Area.css';

const Area = () => {
    return (
        <section id="area" className="area">
            <div className="container">
                <h2 className="section-title">対応地域</h2>
                <p className="section-subtitle">
                    以下の地域を中心にサービスを提供しております
                </p>
                <div className="area-content">
                    <div className="area-main">
                        <h3>主要対応エリア</h3>
                        <ul className="area-list">
                            <li>○○市全域</li>
                            <li>△△市全域</li>
                            <li>□□区全域</li>
                            <li>その他近隣地域</li>
                        </ul>
                    </div>
                    <div className="area-note">
                        <p>
                            <strong>※ 上記以外の地域も対応可能な場合がございます</strong>
                        </p>
                        <p>
                            お気軽にお問い合わせください。
                            <br />
                            距離や荷物の内容によってご相談に応じます。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Area;
