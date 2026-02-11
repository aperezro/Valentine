import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Cat } from './Cat';
import SplitText from './SplitText';
import nerdcatUrl from './assets/nerdcat.jpeg';
import gifUrl from './assets/200w.gif';
import plinkNerdGif from './assets/plink-nerd.gif';
import './App.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const sectionRef = useRef(null);
  const questionRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollHintRef = useRef(null);
  const gifRef = useRef(null);

  const handleNoResponse = () => {
    alert('Are you sure? 💔');
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !questionRef.current || !buttonsRef.current || !gifRef.current) return;

      const question = questionRef.current;
      const buttons = buttonsRef.current;
      const gif = gifRef.current;

      gsap.set([gif, question, buttons], { opacity: 0, y: 30 });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(gif, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
          gsap.to(question, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
          gsap.to(buttons, { opacity: 1, y: 0, duration: 0.6, delay: 0.35, ease: 'power3.out' });
        }
      });

      return () => st.kill();
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;
    const t = gsap.to(hint, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    return () => t.kill();
  }, []);

  return (
    <div className="app" style={{ '--bg-img': `url(${nerdcatUrl})` }}>
      <div className="cat-layer">
        <Cat />
      </div>
      <section className="hero" style={{ '--hero-bg-img': `url(${plinkNerdGif})` }}>
        <div className="hero-inner">
          <SplitText
            text="I have a Question 🤓"
            className="main-text"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            tag="h1"
            immediate
          />
          <p ref={scrollHintRef} className="scroll-hint" aria-hidden="true">
            ↓ Scroll
          </p>
        </div>
      </section>

      <section ref={sectionRef} className="scroll-section">
        <img ref={gifRef} src={gifUrl} alt="" className="valentine-gif" />
        <h2 ref={questionRef} className="question-text">
          Will you be my Valentine?
        </h2>
        <div ref={buttonsRef} className="buttons-wrapper">
          <button className="valentine-button no-button" onClick={handleNoResponse}>
            No
          </button>
          <button className="valentine-button no-button" onClick={handleNoResponse}>
            No
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
