import './App.css';
import Area from './components/Area';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Services from './components/Services';

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Services />
      <Area />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
