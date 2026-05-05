const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const topbar = document.getElementById("topbar");

navToggle?.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav a").forEach((a) => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", window.scrollY > 30);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const productData = {
  "15": {
    title: "ECTRA 1.5 kW",
    text: "Compact high-efficiency BLDC / EC platform for HVAC fan assemblies, AHU modules and small plug fan applications.",
    specs: [["Supply", "3×400 VAC"], ["Control", "0–10 V / RTU"], ["Ambient", "-20…+50°C"], ["Interface", "RS-485"]]
  },
  "40": {
    title: "ECTRA 4.0 kW",
    text: "Balanced power platform for medium AHU, plug fan and retrofit applications with full telemetry and protection.",
    specs: [["Supply", "3×400 VAC"], ["Duty", "HVAC S1"], ["Monitoring", "Current / DC bus"], ["Control", "Analog / Modbus"]]
  },
  "75": {
    title: "ECTRA 7.5 kW",
    text: "High power BLDC platform for large airflow systems, fan wall concepts and demanding industrial ventilation.",
    specs: [["Supply", "3×400 VAC"], ["Application", "Large HVAC"], ["Protection", "Thermal / HV / Current"], ["Integration", "OEM / BMS / PLC"]]
  }
};

const productInfo = document.getElementById("productInfo");

document.querySelectorAll(".model-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".model-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const item = productData[btn.dataset.model];
    productInfo.innerHTML = `
      <p class="product-label">ACTIVE CONFIGURATION</p>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <div class="spec-grid">
        ${item.specs.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}
      </div>
    `;
  });
});

const rpm = document.getElementById("rpm");
const amps = document.getElementById("amps");

setInterval(() => {
  const r = 1220 + Math.round(Math.random() * 70);
  const a = (5.5 + Math.random() * 0.9).toFixed(1);
  if (rpm) rpm.textContent = r;
  if (amps) amps.textContent = `${a} A`;
}, 1400);

const hotspotContent = {
  housing: {
    title: "Rigid aluminium housing",
    text: "The outer housing provides a stable mechanical reference and a direct thermal path from the stator to the environment. This is one of the key advantages of an inrunner HVAC motor."
  },
  cooling: {
    title: "Cooling ribs and thermal path",
    text: "The stator is positioned close to the housing, which supports effective heat transfer. Lower winding temperature means better durability and more stable continuous operation."
  },
  shaft: {
    title: "Compact inrunner shaft system",
    text: "The rotor-bearing system is compact and mechanically stiff. This reduces radial and axial deflection and improves stability at higher rotational speeds."
  },
  electronics: {
    title: "Integrated power and control electronics",
    text: "The platform is prepared for inverter control, diagnostics, protection logic, Modbus RTU communication and OEM integration workflows."
  }
};

document.querySelectorAll(".hotspot").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".hotspot").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const data = hotspotContent[button.dataset.hotspot];
    const title = document.getElementById("hotspotTitle");
    const text = document.getElementById("hotspotText");

    if (title && text && data) {
      title.textContent = data.title;
      text.textContent = data.text;
    }
  });
});
