const form = document.getElementById("willowlyForm");
    const successBox = document.getElementById("successBox");
    const submitBtn = form.querySelector("button");

    document.getElementById("started_at").value = Date.now();

    function isValidEmail(email){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const bodyPart = form.querySelector('input[name="body_part"]:checked')?.value;
      const researchOk = form.querySelector('input[name="research_ok"]:checked')?.value;

      if (!name || !isValidEmail(email) || !bodyPart || !researchOk) {
        alert("Please complete all fields.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Entering…";

      const payload = {
        name,
        email,
        body_part: bodyPart,
        research_ok: researchOk,
        website: form.querySelector('input[name="website"]').value,
        started_at: Number(document.getElementById("started_at").value),
        source: "qr-packaging",
        user_agent: navigator.userAgent
      };

      try{
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json().catch(()=>({}));

        if (res.ok && data.ok){
          successBox.style.display = "block";
          successBox.scrollIntoView({behavior:"smooth", block:"center"});
          form.reset();
          document.getElementById("started_at").value = Date.now();
        } else {
          alert("Something went wrong. Please try again.");
        }

      } catch {
        alert("Network error. Please try again.");
      }

      submitBtn.disabled = false;
      submitBtn.textContent = "Enter the prize draw";
    });
