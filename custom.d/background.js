// Hintergrund-Animationen: Punkte + Parallax + Glow-Orbits
(function () {
    /* ================================
       RANDOM PUNKTE + PARALLAX
    ================================ */
    const LAYER_COUNT = 8;        // Anzahl Punkt-Ebenen
    const POINTS_PER_LAYER = 22;  // Punkte pro Ebene
    const pointsContainer = document.getElementById("bt-points");
    const pointLayers = [];

    if (pointsContainer) {
        for (let i = 0; i < LAYER_COUNT; i++) {
            const layer = document.createElement("div");
            layer.classList.add("bt-points-layer");

            // leichte Helligkeitsvariation pro Layer
            layer.style.setProperty('--layer-alpha', (0.5 + Math.random() * 0.5).toFixed(2));

            // Delay – sorgt dafür, dass die Ebenen nicht gleichzeitig blinken
            layer.style.animationDelay = (Math.random() * 8).toFixed(2) + "s";

            const gradients = [];
            for (let p = 0; p < POINTS_PER_LAYER; p++) {
                const size = (Math.random() * 6 + 2).toFixed(1); // 2–8px
                const x = (Math.random() * 100).toFixed(1) + "%";
                const y = (Math.random() * 100).toFixed(1) + "%";
                const alpha = (Math.random() * 0.6 + 0.4).toFixed(2);

                gradients.push(
                    `radial-gradient(${size}px ${size}px at ${x} ${y}, rgba(70,255,120,${alpha}), transparent)`
                );
            }

            layer.style.backgroundImage = gradients.join(",");
            // Tiefe für Parallax
            layer.dataset.depth = (0.3 + (i / LAYER_COUNT) * 0.7).toFixed(2); // 0.3–1.0

            pointsContainer.appendChild(layer);
            pointLayers.push(layer);
        }

        // Parallax (Maus + Scroll)
        let mouseX = 0.5;
        let mouseY = 0.5;
        let scrollY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
        });

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY || window.pageYOffset || 0;
        });

        function animateParallax() {
            const h = window.innerHeight || 1;
            pointLayers.forEach((layer) => {
                const depth = parseFloat(layer.dataset.depth || 0.5);
                const offsetX = (mouseX - 0.5) * depth * 40;
                const offsetY =
                    (mouseY - 0.5) * depth * 20 +
                    (scrollY / h) * depth * 30;

                layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
            });
            requestAnimationFrame(animateParallax);
        }
        animateParallax();
    }

    /* ================================
       RANDOM GLOW-KREISE
    ================================ */
    const orbitContainer = document.getElementById("bt-glow-orbits");
    if (orbitContainer) {
        const ORBIT_MIN = 4;      // hier kannst du min. Anzahl ändern
        const ORBIT_MAX = 15;     // und hier max. Anzahl
        const orbitCount = ORBIT_MIN + Math.floor(Math.random() * (ORBIT_MAX - ORBIT_MIN + 1));

        for (let i = 0; i < orbitCount; i++) {
            const orbit = document.createElement("div");
            orbit.classList.add("bt-orbit");

            // Zufällige Größe
            const size = Math.random() * 300 + 260; // 260–560px
            orbit.style.width = size + "px";
            orbit.style.height = size + "px";

            // Zufällige Position im Viewport
            const x = Math.random() * 80 + 5;  // 5%–85%
            const y = Math.random() * 80 + 5;  // 5%–85%
            orbit.style.left = x + "%";
            orbit.style.top = y + "%";

            // Zufällige Offsets für die Orbit-Animation
            const offsetX = (Math.random() * 20 - 10).toFixed(1); // -10px bis 10px
            const offsetY = (Math.random() * 20 - 10).toFixed(1); // -10px bis 10px
            orbit.style.setProperty('--orbit-offset-x', offsetX + "px");
            orbit.style.setProperty('--orbit-offset-y', offsetY + "px");

            // Zufällige Animationsdauer & Richtung
            const duration = (Math.random() * 25 + 35).toFixed(1); // 35–60s
            orbit.style.animationDuration = duration + "s";
            orbit.style.animationDirection = Math.random() > 0.5 ? "normal" : "reverse";

            // leichte Variation in der Intensität
            const alphaBorder = (0.2 + Math.random() * 0.25).toFixed(2);
            const alphaGlow = (0.25 + Math.random() * 0.3).toFixed(2);
            orbit.style.borderColor = `rgba(57,255,20,${alphaBorder})`;
            orbit.style.boxShadow = `0 0 18px rgba(57,255,20,${alphaGlow})`;

            orbitContainer.appendChild(orbit);
        }
    }
})();
