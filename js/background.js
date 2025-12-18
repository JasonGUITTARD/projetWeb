(() => {
  const canvas = document.getElementById("particles-bg");
  const ctx = canvas.getContext("2d", { alpha: true });

  const CONFIG = {
    density: 0.00005,     
    maxParticles: 120,
    minParticles: 40,
    speed: 0.10, // Vitesse de déplacement
    linkDistance: 140, // Taille des trait
    mouseRadius: 160, // Rayon de détection de la souris
    particleSize: [1.2, 2.6], // Taile des particules
    lineWidth: 1,
  };

  let w = 0, h = 0, dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let particles = [];
  let mouse = { x: null, y: null };


	function getThemeColors(){
		const styles = getComputedStyle(document.documentElement);

		return {
			bg: styles.getPropertyValue('--net-bg').trim(),
			dot: styles.getPropertyValue('--net-point-main').trim(),
			dotAlt: styles.getPropertyValue('--net-point-accent').trim(),
			line: styles.getPropertyValue('--net-line-main').trim(),
			lineAlt: styles.getPropertyValue('--net-line-accent').trim(),
		};
	}


  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;

    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.floor(w * h * CONFIG.density);
    const count = Math.max(CONFIG.minParticles, Math.min(CONFIG.maxParticles, target));

    if (particles.length > count) particles.length = count;
    while (particles.length < count) particles.push(makeParticle(true));
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function makeParticle(randomPos = false) {
    const size = rand(CONFIG.particleSize[0], CONFIG.particleSize[1]);
    return {
      x: randomPos ? rand(0, w) : (mouse.x ?? rand(0, w)),
      y: randomPos ? rand(0, h) : (mouse.y ?? rand(0, h)),
      vx: rand(-CONFIG.speed, CONFIG.speed),
      vy: rand(-CONFIG.speed, CONFIG.speed),
      r: size,
      t: Math.random() < 0.15 ? "alt" : "main", 
    };
  }

  function step() {
    const colors = getThemeColors();
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= w) p.vx *= -1;
      if (p.y <= 0 || p.y >= h) p.vy *= -1;

      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));
    }

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONFIG.linkDistance) {
          const alpha = 1 - dist / CONFIG.linkDistance;
          ctx.lineWidth = CONFIG.lineWidth;

          const useAlt = (a.t === "alt" || b.t === "alt");
          ctx.strokeStyle = useAlt
            ? colors.lineAlt.replace("0.12", (0.12 + alpha * 0.10).toFixed(3))
            : colors.line.replace("0.22", (0.18 + alpha * 0.16).toFixed(3));

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < CONFIG.mouseRadius) {
          const malpha = 1 - mdist / CONFIG.mouseRadius;
          ctx.lineWidth = 1;
          ctx.strokeStyle = colors.line;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          a.vx += (-mdx / (mdist || 1)) * 0.0025 * malpha;
          a.vy += (-mdy / (mdist || 1)) * 0.0025 * malpha;
        }
      }
    }

    for (const p of particles) {
      ctx.fillStyle = (p.t === "alt") ? colors.dotAlt : colors.dot;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", resize, { passive: true });

  const themeObserver = new MutationObserver(() => {
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bs-theme"] });

  resize();
  requestAnimationFrame(step);
})();