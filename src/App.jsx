import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createHearts = () => {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Math.random(),
        text: hearts[Math.floor(Math.random() * hearts.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        duration: Math.random() * 2 + 2
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 4000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Particles */}
      <div className="particles-container">
        {particles.map(p => (
          <div 
            key={p.id} 
            className="particle" 
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <button className="scroll-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
                style={{opacity: scrollPosition > 300 ? 1 : 0}}>↑</button>
      </header>

      {/* Section 1: Welcome */}
      <section id="welcome" className="section section-welcome">
        <div className="section-content">
          <div className="welcome-animation"></div>
          <h1 className="main-title">Иришка 💕</h1>
          <p className="main-subtitle">14 Февраля</p>
          <div className="flowers">
            <span className="flower">🌹</span>
            <span className="flower">🌷</span>
            <span className="flower">💐</span>
            <span className="flower">🌹</span>
          </div>
          <p className="welcome-text">Дай мне рассказать о том, какая ты волшебная... ✨</p>
          <button className="btn btn-primary" onClick={createHearts}>
            Начнем! 💘
          </button>
        </div>
      </section>

      {/* Gallery Section 1 */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="photo-placeholder">
            <span className="emoji">📸</span>
            <p>Наш первый момент</p>
          </div>
          <div className="photo-placeholder">
            <span className="emoji">✨</span>
            <p>Твой взгляд</p>
          </div>
        </div>
      </section>

      {/* Section 2: Confession */}
      <section id="confession" className="section section-dark">
        <div className="section-content">
          <h2 className="section-title">Мое признание 💕</h2>
          
          <div className="confession-card">
            <p className="confession-text">
              Иришка, люби меня тем же способом, которым я люблю тебя.
            </p>
            
            <div className="divider"></div>
            
            <p className="confession-paragraph">
              С того момента, как я тебя встретил, жизнь стала совсем другой. Ты не просто девушка - ты целый мир красоты, смеха и тепла. Каждый твой день лучше, чем я его представлял, потому что ты в нем.
            </p>

            <p className="confession-paragraph">
              Твоя улыбка ярче всех звезд. Твой смех - моя любимая мелодия. Твою присутствие рядом - это волшебство, которое я хотел бы ощущать каждый день своей жизни.
            </p>

            <p className="confession-paragraph">
              Ты делаешь обычные моменты особенными. Ты делаешь простые дни идеальными. И я благодарен за каждую секунду, проведенную с тобой.
            </p>

            <div className="divider"></div>

            <p className="confession-final">
              Я люблю тебя. 💕
            </p>
          </div>

          <div className="floating-hearts">
            <span className="float-heart">❤️</span>
            <span className="float-heart">💕</span>
            <span className="float-heart">💖</span>
            <span className="float-heart">💗</span>
            <span className="float-heart">💓</span>
          </div>
        </div>
      </section>

      {/* Gallery Section 2 */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="photo-placeholder">
            <span className="emoji">😊</span>
            <p>Улыбка которую люблю</p>
          </div>
          <div className="photo-placeholder">
            <span className="emoji">🌟</span>
            <p>Моя звезда</p>
          </div>
        </div>
      </section>

      {/* Section 3: About Us */}
      <section className="section section-light">
        <div className="section-content">
          <h2 className="section-title">О нас двоих 👫</h2>
          
          <div className="cards-grid">
            <div className="card">
              <div className="card-emoji">❤️</div>
              <h3>Что я люблю в тебе</h3>
              <p>Твоя доброта, твой смех, твои мечты. Я люблю каждый момент с тобой.</p>
            </div>

            <div className="card">
              <div className="card-emoji">✨</div>
              <h3>Волшебство</h3>
              <p>Ты волшебна для меня. Твоя энергия делает мир ярче и теплее.</p>
            </div>

            <div className="card">
              <div className="card-emoji">🌈</div>
              <h3>Мой цвет</h3>
              <p>Ты - мой самый яркий, самый красивый цвет. Мой смысл жизни.</p>
            </div>

            <div className="card">
              <div className="card-emoji">💫</div>
              <h3>Моя мечта</h3>
              <p>Мечта, которая сбылась. Реальность, которая лучше воображения.</p>
            </div>

            <div className="card">
              <div className="card-emoji">🏠</div>
              <h3>Мой дом</h3>
              <p>Твое сердце - мой дом. Твои объятия - мой рай на земле.</p>
            </div>

            <div className="card">
              <div className="card-emoji">🌹</div>
              <h3>Мой мир</h3>
              <p>Мой весь мир в одной Иришке. Всё, что мне нужно - это ты.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section 3 */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="photo-placeholder">
            <span className="emoji">👫</span>
            <p>Вместе</p>
          </div>
          <div className="photo-placeholder">
            <span className="emoji">🤍</span>
            <p>Неразлучны</p>
          </div>
        </div>
      </section>

      {/* Section 4: Memories */}
      <section className="section section-dark">
        <div className="section-content">
          <h2 className="section-title">Наши Моменты 💭</h2>
          
          <div className="memories-grid">
            <div className="memory-card">
              <div className="memory-icon">🎭</div>
              <h3>Смех</h3>
              <p>Твой смех - мой любимый звук в этом мире</p>
            </div>

            <div className="memory-card">
              <div className="memory-icon">🌙</div>
              <h3>Ночные разговоры</h3>
              <p>Бесценные часы, когда это только мы и звезды</p>
            </div>

            <div className="memory-card">
              <div className="memory-icon">🎵</div>
              <h3>Музыка</h3>
              <p>Каждая песня напоминает мне о тебе</p>
            </div>

            <div className="memory-card">
              <div className="memory-icon">🚶</div>
              <h3>Прогулки</h3>
              <p>Даже просто рядом с тобой - это уже счастье</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section 4 */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="photo-placeholder">
            <span className="emoji">🌅</span>
            <p>Рассвет вместе</p>
          </div>
          <div className="photo-placeholder">
            <span className="emoji">🌙</span>
            <p>Закат вместе</p>
          </div>
        </div>
      </section>

      {/* Section 5: Future */}
      <section className="section section-light">
        <div className="section-content">
          <h2 className="section-title">Наше Будущее 🌟</h2>
          
          <div className="future-card">
            <p className="future-text">
              Я вижу нас в каждом дне, каждом году, каждом мгновении. Я вижу нашу жизнь, наполненную любовью, смехом и волшебством.
            </p>
            
            <div className="future-points">
              <div className="point">
                <span className="point-number">1</span>
                <p>Я хочу просыпаться и видеть твое лицо</p>
              </div>
              <div className="point">
                <span className="point-number">2</span>
                <p>Я хочу создавать с тобой бесценные моменты</p>
              </div>
              <div className="point">
                <span className="point-number">3</span>
                <p>Я хочу быть твоей опорой и поддержкой</p>
              </div>
              <div className="point">
                <span className="point-number">4</span>
                <p>Я хочу расти вместе с тобой</p>
              </div>
              <div className="point">
                <span className="point-number">5</span>
                <p>Я хочу любить тебя вечно</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section 5 */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="photo-placeholder">
            <span className="emoji">💍</span>
            <p>Будущие обещания</p>
          </div>
          <div className="photo-placeholder">
            <span className="emoji">♾️</span>
            <p>Вечность</p>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="section section-final">
        <div className="section-content">
          <div className="final-card">
            <h2>С Днем Святого Валентина! 💘</h2>
            
            <p className="final-text">
              Иришка, ты - моё всё.
            </p>

            <p className="final-text">
              Ты - волшебство, которое стало реальностью.
            </p>

            <p className="final-text">
              И я благодарен за каждый момент, проведённый с тобой.
            </p>

            <div className="final-hearts">
              <span>❤️</span>
              <span>💕</span>
              <span>💖</span>
              <span>💗</span>
              <span>💓</span>
            </div>

            <p className="final-signature">
              С любовью, Шушуня 💕
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
