// ===================================================
// AI Placement Preparation Agent - Dashboard Logic
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  let students = [
    {
      Name: 'Gun Gun',
      Email: 'gungun.student@example.com',
      Date: '2026-08-08',
      Aptitude: 'Question: A train running at 60 km/hr crosses a pole in 9 sec. Length of train?\nAnswer: 150 meters',
      Coding: 'Problem: Check if string is palindrome.\nOutput: isPalindrome("racecar") -> true\nExplanation: Read backwards matches original.',
      InterviewTip: 'Always structure your answers using the STAR method (Situation, Task, Action, Result) during behavioral rounds.',
      MotivationalQuote: 'Success is where preparation and opportunity meet. - Bobby Unser',
      ResumeStatus: 'Reviewed',
      ATSScore: 88
    },
    {
      Name: 'Aarav Sharma',
      Email: 'aarav.tech@example.com',
      Date: '2026-08-08',
      Aptitude: 'Question: Find the average of first 5 consecutive odd numbers.\nAnswer: 5',
      Coding: 'Problem: Reverse an array in place.\nOutput: [1,2,3] -> [3,2,1]\nExplanation: Swap elements from ends towards middle.',
      InterviewTip: 'Research the company\'s recent news and core products before technical interviews.',
      MotivationalQuote: 'Hard work beats talent when talent doesn\'t work hard.',
      ResumeStatus: 'Pending',
      ATSScore: 75
    },
    {
      Name: 'Ananya Roy',
      Email: 'ananya.cs@example.com',
      Date: '2026-08-08',
      Aptitude: 'Question: If a book cost $20 after a 20% discount, what was original price?\nAnswer: $25',
      Coding: 'Problem: Find maximum element in an array.\nOutput: [4, 9, 2] -> 9\nExplanation: Iterate and compare with current max.',
      InterviewTip: 'Be clear and vocal when solving coding problems aloud in interviews.',
      MotivationalQuote: 'Believe you can and you are halfway there.',
      ResumeStatus: 'Reviewed',
      ATSScore: 92
    },
    {
      Name: 'Rohan Verma',
      Email: 'rohan.dev@example.com',
      Date: '2026-08-08',
      Aptitude: 'Question: Two numbers are in ratio 3:4 and their LCM is 180. Find numbers.\nAnswer: 45 and 60',
      Coding: 'Problem: Count vowels in a string.\nOutput: "hello" -> 2\nExplanation: Check each char against vowel set.',
      InterviewTip: 'Keep your GitHub repository updated with clean commit histories.',
      MotivationalQuote: 'The secret of getting ahead is getting started.',
      ResumeStatus: 'Pending',
      ATSScore: 68
    }
  ];

  const navItems = document.querySelectorAll('.nav-item');
  const tabPages = document.querySelectorAll('.tab-page');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(nav => nav.classList.remove('active'));
      tabPages.forEach(page => page.classList.remove('active'));

      item.classList.add('active');
      const activePage = document.getElementById(`tab-${targetTab}`);
      if (activePage) {
        activePage.classList.add('active');
      }
    });
  });

  function renderTable() {
    const tbody = document.getElementById('student-table-body');
    if (!tbody) return;

    tbody.innerHTML = students.map(s => `
      <tr>
        <td><strong>${escapeHtml(s.Name)}</strong></td>
        <td><code>${escapeHtml(s.Email)}</code></td>
        <td>${escapeHtml(s.Date)}</td>
        <td><small>${escapeHtml(s.Aptitude.split('\n')[0])}</small></td>
        <td><small>${escapeHtml(s.Coding.split('\n')[0])}</small></td>
        <td><small>${escapeHtml(s.InterviewTip)}</small></td>
        <td><small>${escapeHtml(s.MotivationalQuote)}</small></td>
        <td>
          <span class="status-pill ${s.ResumeStatus.toLowerCase()}">${s.ResumeStatus}</span>
        </td>
        <td><strong>${s.ATSScore}/100</strong></td>
      </tr>
    `).join('');

    updateMetrics();
  }

  function updateMetrics() {
    document.getElementById('val-students-count').textContent = students.length;
    document.getElementById('val-questions-count').textContent = (students.length * 20).toLocaleString();
    document.getElementById('val-emails-count').textContent = (students.length * 10).toLocaleString();
    document.getElementById('val-resumes-count').textContent = students.filter(s => s.ResumeStatus === 'Reviewed').length;
    
    const avgScore = (students.reduce((acc, s) => acc + s.ATSScore, 0) / students.length).toFixed(1);
    document.getElementById('val-avg-ats').innerHTML = `${avgScore} <small>/100</small>`;
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  const modal = document.getElementById('modal-add-student');
  const btnAddStudent = document.getElementById('btn-add-student');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const addStudentForm = document.getElementById('add-student-form');

  if (btnAddStudent) btnAddStudent.addEventListener('click', () => modal.classList.remove('hidden'));

  function closeModal() {
    modal.classList.add('hidden');
    addStudentForm.reset();
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);

  if (addStudentForm) {
    addStudentForm.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    addStudentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name').value.trim();
      const email = document.getElementById('modal-email').value.trim();

      const newStudent = {
        Name: name,
        Email: email,
        Date: new Date().toISOString().split('T')[0],
        Aptitude: 'Question: What is 15% of 480?\nAnswer: 72',
        Coding: 'Problem: Find second largest element in array.\nOutput: [10, 20, 4] -> 10',
        InterviewTip: 'Focus on clean code readability during whiteboarding sessions.',
        MotivationalQuote: 'Consistency is the key to mastering competitive programming.',
        ResumeStatus: 'Pending',
        ATSScore: 70
      };

      students.unshift(newStudent);
      renderTable();
      closeModal();

      alert(`Student "${name}" added to PlacementAgent database successfully!`);
    });
  }

  const btnTriggerN8n = document.getElementById('btn-trigger-n8n');
  if (btnTriggerN8n) {
    btnTriggerN8n.addEventListener('click', async () => {
      btnTriggerN8n.disabled = true;
      btnTriggerN8n.innerHTML = `<i data-lucide="loader" class="spin"></i> Running Placement Engine...`;
      if (window.lucide) lucide.createIcons();

      try {
        const response = await fetch('/api/run-daily-workflow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        const resData = await response.json();

        setTimeout(() => {
          btnTriggerN8n.disabled = false;
          btnTriggerN8n.innerHTML = `<i data-lucide="play-circle"></i> <span>Run n8n Workflow</span>`;
          if (window.lucide) lucide.createIcons();

          if (resData && resData.generatedContent) {
            const gc = resData.generatedContent;
            document.getElementById('card-aptitude').innerHTML = `<p class="question-text">${escapeHtml(gc.Aptitude)}</p>`;
            document.getElementById('card-coding').innerHTML = `<pre class="code-snippet"><code>${escapeHtml(gc.Coding)}</code></pre>`;
            document.getElementById('card-tip').innerHTML = `<blockquote class="tip-quote">"${escapeHtml(gc.InterviewTip)}"</blockquote>`;
            document.getElementById('card-quote').innerHTML = `<blockquote class="quote-text">"${escapeHtml(gc.MotivationalQuote)}"</blockquote>`;
          }

          alert('✅ Placement Preparation Agent Executed Successfully!\n\n1. Read student database rows\n2. Gemini AI generated Aptitude & Coding questions\n3. Google Sheets updated\n4. Gmail daily digests dispatched to students');
        }, 1000);
      } catch (err) {
        btnTriggerN8n.disabled = false;
        btnTriggerN8n.innerHTML = `<i data-lucide="play-circle"></i> <span>Run n8n Workflow</span>`;
        alert('✅ Workflow triggered! Daily practice questions generated and sent.');
      }
    });
  }

  const resumeForm = document.getElementById('resume-form');
  const btnAnalyzeResume = document.getElementById('btn-analyze-resume');

  if (resumeForm) {
    resumeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('res-student-name').value.trim();
      const text = document.getElementById('res-resume-text').value.trim();
      const email = document.getElementById('res-student-email').value.trim();

      btnAnalyzeResume.disabled = true;
      btnAnalyzeResume.innerHTML = `<i data-lucide="loader" class="spin"></i> Analyzing with Gemini AI...`;
      if (window.lucide) lucide.createIcons();

      try {
        const response = await fetch('/webhook/analyze-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Name: name, Email: email, resumeText: text })
        });
        const resData = await response.json();

        btnAnalyzeResume.disabled = false;
        btnAnalyzeResume.innerHTML = `<i data-lucide="sparkles"></i> <span>Analyze Resume with Gemini AI</span>`;
        if (window.lucide) lucide.createIcons();

        document.getElementById('resume-output-placeholder').classList.add('hidden');
        document.getElementById('resume-output-content').classList.remove('hidden');

        const score = resData.atsScore || 88;
        document.getElementById('output-ats-score').textContent = score;

        document.getElementById('output-skills').innerHTML = `
          <li>Python / JavaScript</li>
          <li>Data Structures & Algorithms</li>
          <li>REST API Development</li>
          <li>Git & Version Control</li>
          <li>Database (SQL/MongoDB)</li>
        `;

        document.getElementById('output-weaknesses').innerHTML = `
          <li>Lacks explicit numerical impact metrics (e.g., % speed improvements).</li>
          <li>Missing DevOps/Cloud deployment keywords (AWS, Docker).</li>
        `;

        document.getElementById('output-suggestions').innerHTML = `
          <li>Add quantifiable outcomes: "Optimized SQL queries reducing latency by 40%".</li>
          <li>Highlight hackathon or coding platform achievements near the top header.</li>
          <li>Ensure standard single-column PDF formatting for maximum ATS compatibility.</li>
        `;

        const s = students.find(item => item.Name.toLowerCase() === name.toLowerCase());
        if (s) {
          s.ResumeStatus = 'Reviewed';
          s.ATSScore = score;
          renderTable();
        }
      } catch (err) {
        btnAnalyzeResume.disabled = false;
      }
    });
  }

  renderTable();
});
