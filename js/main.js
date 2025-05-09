import { Chart } from "@/components/ui/chart"
/**
 * Main JavaScript for Vishing Prevention Website
 * Enhanced Professional Version
 */

document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("fade-out")
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    })
  }

  // Scroll animations and navbar state
  const navbar = document.querySelector(".navbar")
  const scrollAnimationElements = document.querySelectorAll(".reveal")
  const fadeElements = document.querySelectorAll(".fade-up, .fade-right, .fade-left")

  // Back to top button
  const backToTopButton = document.createElement("a")
  backToTopButton.href = "#"
  backToTopButton.classList.add("back-to-top", "d-flex", "align-items-center", "justify-content-center")
  backToTopButton.innerHTML = '<i class="bi bi-arrow-up-short"></i>'
  document.body.appendChild(backToTopButton)

  // Function to handle scroll events
  function handleScroll() {
    // Navbar scroll state
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Back to top button visibility
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }

    // Reveal animations on scroll
    scrollAnimationElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active")
      }
    })

    // AOS-like animations
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("in-view")
      }
    })

    // Active navigation based on scroll position
    activateNavOnScroll()
  }

  // Initialize scroll handler
  window.addEventListener("scroll", handleScroll)
  handleScroll() // Trigger once on load

  // Activate navigation based on scroll position
  function activateNavOnScroll() {
    const sections = document.querySelectorAll("section, header")
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Skip dropdown toggles
      if (this.classList.contains("dropdown-toggle")) return

      // For regular anchor links
      e.preventDefault()

      const targetId = this.getAttribute("href")

      // Skip if it's just "#"
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close the mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show")
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Update URL without page reload
        history.pushState(null, null, targetId)
      }
    })
  })

  // Form submission handling with validation
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      let valid = true
      const formElements = contactForm.querySelectorAll("input, textarea")

      formElements.forEach((element) => {
        if (element.value.trim() === "") {
          valid = false
          element.classList.add("is-invalid")
        } else {
          element.classList.remove("is-invalid")
        }
      })

      if (!valid) {
        showNotification("Por favor, completa todos los campos obligatorios.", "danger")
        return
      }

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would normally send the data to a server
      // For demo purposes, we'll just show a notification
      showNotification(
        `¡Gracias ${name}! Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.`,
        "success",
      )

      // Reset form
      contactForm.reset()
    })
  }

  // Notification function
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.classList.add("notification", `notification-${type}`)
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi ${type === "success" ? "bi-check-circle" : type === "danger" ? "bi-exclamation-triangle" : "bi-info-circle"}"></i>
        <p>${message}</p>
      </div>
      <button class="notification-close"><i class="bi bi-x"></i></button>
    `

    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Auto-hide after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 5000)

    // Close button
    notification.querySelector(".notification-close").addEventListener("click", () => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    })
  }

  // Video modal functionality
  const videoLinks = document.querySelectorAll(".video-link")
  if (videoLinks.length > 0) {
    videoLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Get video title and source from data attributes
        const videoTitle = this.dataset.title || "Video Demostrativo"
        const videoSource = this.dataset.src || ""

        // Create modal dynamically
        const modalHTML = `
          <div class="modal fade" id="videoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">${videoTitle}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="ratio ratio-16x9">
                    ${
                      videoSource
                        ? `<iframe src="${videoSource}" allowfullscreen></iframe>`
                        : `<div class="bg-dark d-flex align-items-center justify-content-center text-white">
                      <p>Video de demostración: ${videoTitle}</p>
                    </div>`
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        `

        // Append modal to body
        document.body.insertAdjacentHTML("beforeend", modalHTML)

        // Show modal
        const videoModalElement = document.getElementById("videoModal")
        // Assuming 'bootstrap' is available globally or imported elsewhere
        const videoModal = new bootstrap.Modal(videoModalElement)
        videoModal.show()

        // Remove modal from DOM after it's hidden
        videoModalElement.addEventListener("hidden.bs.modal", function () {
          this.remove()
        })
      })
    })
  }

  // Course registration button functionality
  const courseButtons = document.querySelectorAll("#cursos .btn")
  if (courseButtons.length > 0) {
    courseButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        if (button.classList.contains("btn-link")) return // Skip "read more" buttons

        e.preventDefault()

        // Get course title
        const courseCard = this.closest(".card")
        const courseTitle = courseCard.querySelector(".card-title").textContent

        // Create modal dynamically
        const modalHTML = `
          <div class="modal fade" id="courseModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Inscripción al Curso</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p>Estás a punto de inscribirte en el curso: <strong>${courseTitle}</strong></p>
                  <form id="courseRegistrationForm">
                    <div class="mb-3">
                      <label for="registrationName" class="form-label">Nombre completo</label>
                      <input type="text" class="form-control" id="registrationName" required>
                    </div>
                    <div class="mb-3">
                      <label for="registrationEmail" class="form-label">Correo electrónico</label>
                      <input type="email" class="form-control" id="registrationEmail" required>
                    </div>
                    <div class="mb-3">
                      <label for="registrationPhone" class="form-label">Teléfono</label>
                      <input type="tel" class="form-control" id="registrationPhone" required>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-primary" id="confirmRegistration">Confirmar inscripción</button>
                </div>
              </div>
            </div>
          </div>
        `

        // Append modal to body
        document.body.insertAdjacentHTML("beforeend", modalHTML)

        // Show modal
        const courseModalElement = document.getElementById("courseModal")
        const courseModal = new bootstrap.Modal(courseModalElement)
        courseModal.show()

        // Handle registration confirmation
        document.getElementById("confirmRegistration").addEventListener("click", () => {
          const form = document.getElementById("courseRegistrationForm")
          const inputs = form.querySelectorAll("input")
          let valid = true

          inputs.forEach((input) => {
            if (!input.value.trim()) {
              valid = false
              input.classList.add("is-invalid")
            } else {
              input.classList.remove("is-invalid")
            }
          })

          if (valid) {
            courseModal.hide()
            setTimeout(() => {
              showNotification(`Te has inscrito exitosamente en el curso: ${courseTitle}`, "success")
            }, 500)
          }
        })

        // Remove modal from DOM after it's hidden
        courseModalElement.addEventListener("hidden.bs.modal", function () {
          this.remove()
        })
      })
    })
  }

  // Real-time alerts system
  const alerts = [
    "Se han detectado llamadas fraudulentas haciéndose pasar por Banco Popular solicitando verificación de datos por 'irregularidades en su cuenta'.",
    "Alerta de vishing: Estafadores se hacen pasar por Claro ofreciendo promociones especiales para obtener datos personales.",
    "Nueva modalidad de vishing: Llamadas falsas de 'Ministerio de Salud' solicitando información para vacunación COVID.",
    "Detectadas llamadas fraudulentas que se hacen pasar por familiares en problemas solicitando transferencias de dinero urgentes.",
    "¡Importante! Se reportan llamadas que simulan ser de empresas de seguridad ofreciendo servicios de protección contra fraudes.",
  ]

  const currentAlertElement = document.getElementById("current-alert")
  if (currentAlertElement) {
    let alertIndex = 0

    // Change alert every 8 seconds with fade effect
    setInterval(() => {
      alertIndex = (alertIndex + 1) % alerts.length

      // Fade out
      currentAlertElement.style.opacity = 0

      // Change text and fade in after transition
      setTimeout(() => {
        currentAlertElement.textContent = alerts[alertIndex]
        currentAlertElement.style.opacity = 1
      }, 500)
    }, 8000)
  }

  // Quiz functionality
  const quizData = [
    {
      question: "¿Qué es el vishing?",
      options: [
        "Un tipo de virus informático",
        "Una estafa por correo electrónico",
        "Un fraude telefónico donde se suplanta la identidad de una entidad legítima",
        "Un software malicioso",
      ],
      correctAnswer: 2,
    },
    {
      question: "¿Qué debes hacer si recibes una llamada sospechosa de tu banco?",
      options: [
        "Proporcionar tu información para verificar tu identidad",
        "Colgar y llamar al número oficial de tu banco",
        "Seguir las instrucciones del llamante para proteger tu cuenta",
        "Dar información parcial, pero no completa",
      ],
      correctAnswer: 1,
    },
    {
      question: "¿Cuál es una señal de advertencia común en las llamadas de vishing?",
      options: [
        "El llamante se identifica correctamente con su nombre completo",
        "Te piden que verifiques información que ya deberían tener",
        "La llamada proviene del número oficial de la entidad",
        "Te ofrecen ayuda sin solicitar información personal",
      ],
      correctAnswer: 1,
    },
    {
      question: "¿Qué grupo demográfico es más vulnerable al vishing en República Dominicana?",
      options: [
        "Adolescentes",
        "Adultos jóvenes (18-30 años)",
        "Adultos de mediana edad (30-50 años)",
        "Adultos mayores (más de 50 años)",
      ],
      correctAnswer: 3,
    },
    {
      question: "¿Cuál de las siguientes NO es una buena práctica para prevenir el vishing?",
      options: [
        "Mantener actualizado el software de seguridad en tu teléfono",
        "Proporcionar información personal si la llamada parece urgente",
        "Verificar la identidad del llamante contactando a la entidad por canales oficiales",
        "Estar al tanto de las alertas de vishing actuales",
      ],
      correctAnswer: 1,
    },
  ]

  // Initialize quiz elements
  const startQuizBtn = document.getElementById("start-quiz")
  const quizStart = document.getElementById("quiz-start")
  const quizQuestions = document.getElementById("quiz-questions")
  const quizResults = document.getElementById("quiz-results")
  const questionText = document.getElementById("question-text")
  const answerOptions = document.getElementById("answer-options")
  const questionNumber = document.getElementById("question-number")
  const nextQuestionBtn = document.getElementById("next-question")
  const scoreElement = document.getElementById("score")
  const resultMessage = document.getElementById("result-message")
  const retakeQuizBtn = document.getElementById("retake-quiz")

  let currentQuestion = 0
  let score = 0
  let selectedAnswer = null

  // Set up quiz event listeners if quiz elements exist
  if (startQuizBtn && quizQuestions && quizResults) {
    startQuizBtn.addEventListener("click", startQuiz)
    nextQuestionBtn.addEventListener("click", goToNextQuestion)
    retakeQuizBtn.addEventListener("click", retakeQuiz)
  }

  // Quiz functions
  function startQuiz() {
    quizStart.classList.add("d-none")
    quizQuestions.classList.remove("d-none")
    currentQuestion = 0
    score = 0
    loadQuestion()
  }

  function loadQuestion() {
    selectedAnswer = null
    nextQuestionBtn.disabled = true

    const question = quizData[currentQuestion]
    questionText.textContent = question.question
    questionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${quizData.length}`

    answerOptions.innerHTML = ""

    question.options.forEach((option, index) => {
      const button = document.createElement("button")
      button.type = "button"
      button.className = "answer-option"
      button.textContent = option
      button.dataset.index = index
      button.addEventListener("click", selectAnswer)
      answerOptions.appendChild(button)
    })
  }

  function selectAnswer(e) {
    const selectedButton = e.target
    const selectedIndex = Number.parseInt(selectedButton.dataset.index)

    // Reset all buttons
    const buttons = answerOptions.querySelectorAll("button")
    buttons.forEach((button) => {
      button.classList.remove("selected", "correct", "incorrect")
    })

    // Highlight selected button
    selectedButton.classList.add("selected")

    // Check if answer is correct
    const correctIndex = quizData[currentQuestion].correctAnswer

    if (selectedIndex === correctIndex) {
      selectedButton.classList.add("correct")
      score++
    } else {
      selectedButton.classList.add("incorrect")
      // Highlight correct answer
      buttons[correctIndex].classList.add("correct")
    }

    selectedAnswer = selectedIndex
    nextQuestionBtn.disabled = false
  }

  function goToNextQuestion() {
    currentQuestion++

    if (currentQuestion < quizData.length) {
      loadQuestion()
    } else {
      showResults()
    }
  }

  function showResults() {
    quizQuestions.classList.add("d-none")
    quizResults.classList.remove("d-none")

    scoreElement.textContent = score

    // Set result message based on score
    if (score === quizData.length) {
      resultMessage.textContent = "¡Excelente! Tienes un conocimiento sólido sobre prevención de vishing."
    } else if (score >= quizData.length * 0.7) {
      resultMessage.textContent = "Buen trabajo. Tienes un buen conocimiento, pero aún puedes aprender más."
    } else if (score >= quizData.length * 0.5) {
      resultMessage.textContent = "No está mal, pero deberías reforzar tus conocimientos sobre vishing."
    } else {
      resultMessage.textContent = "Necesitas aprender más sobre vishing para protegerte adecuadamente."
    }
  }

  function retakeQuiz() {
    quizResults.classList.add("d-none")
    quizQuestions.classList.remove("d-none")
    currentQuestion = 0
    score = 0
    loadQuestion()
  }

  // Initialize charts if the elements exist
  initializeCharts()

  function initializeCharts() {
    // Charts configuration
    Chart.defaults.font.family = "'Poppins', sans-serif"
    Chart.defaults.font.size = 14
    Chart.defaults.color = "#64748b"

    // Vishing Types Chart
    const vishingTypesChartElement = document.getElementById("vishingTypesChart")
    if (vishingTypesChartElement) {
      const vishingTypesCtx = vishingTypesChartElement.getContext("2d")
      new Chart(vishingTypesCtx, {
        type: "doughnut",
        data: {
          labels: [
            "Suplantación de bancos",
            "Soporte técnico falso",
            "Premios/sorteos",
            "Familiares en problemas",
            "Otros",
          ],
          datasets: [
            {
              data: [45, 25, 15, 10, 5],
              backgroundColor: [
                "rgba(37, 99, 235, 0.9)",
                "rgba(244, 63, 94, 0.9)",
                "rgba(16, 185, 129, 0.9)",
                "rgba(245, 158, 11, 0.9)",
                "rgba(168, 85, 247, 0.9)",
              ],
              borderWidth: 0,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 13,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              padding: 12,
              titleFont: {
                size: 14,
              },
              bodyFont: {
                size: 13,
              },
              displayColors: false,
              callbacks: {
                label: (context) => context.label + ": " + context.raw + "%",
              },
            },
          },
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 2000,
            easing: "easeOutQuart",
          },
        },
      })
    }

    // Vishing Trends Chart
    const vishingTrendsChartElement = document.getElementById("vishingTrendsChart")
    if (vishingTrendsChartElement) {
      const vishingTrendsCtx = vishingTrendsChartElement.getContext("2d")
      new Chart(vishingTrendsCtx, {
        type: "line",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
          datasets: [
            {
              label: "Casos reportados",
              data: [120, 150, 180, 210, 250, 300],
              borderColor: "rgba(37, 99, 235, 1)",
              backgroundColor: "rgba(219, 234, 254, 0.5)",
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointBackgroundColor: "#fff",
              pointBorderColor: "rgba(37, 99, 235, 1)",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(226, 232, 240, 0.5)",
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              padding: 12,
              titleFont: {
                size: 14,
              },
              bodyFont: {
                size: 13,
              },
              displayColors: false,
              callbacks: {
                label: (context) => "Casos: " + context.raw,
              },
            },
          },
          animation: {
            duration: 2000,
            easing: "easeOutQuart",
          },
        },
      })
    }
  }

  // Add notification styles dynamically
  const notificationStyles = document.createElement("style")
  notificationStyles.innerHTML = `
    .notification {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      padding: 1rem;
      max-width: 350px;
      width: 100%;
      z-index: 9999;
      transform: translateY(100px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .notification.show {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    .notification-content {
      display: flex;
      align-items: flex-start;
    }
    .notification-content i {
      font-size: 1.25rem;
      margin-right: 0.75rem;
      margin-top: 0.125rem;
    }
    .notification-content p {
      margin: 0;
      flex: 1;
    }
    .notification-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 1rem;
    }
    .notification-success .notification-content i {
      color: var(--success);
    }
    .notification-danger .notification-content i {
      color: var(--secondary);
    }
    .notification-info .notification-content i {
      color: var(--primary);
    }
    .back-to-top {
      position: fixed;
      visibility: hidden;
      opacity: 0;
      right: 15px;
      bottom: 15px;
      z-index: 996;
      background: var(--primary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: all 0.4s;
      color: white;
      font-size: 24px;
      box-shadow: var(--shadow-md);
    }
    .back-to-top.active {
      visibility: visible;
      opacity: 1;
    }
    .back-to-top:hover {
      background: var(--primary-dark);
      color: white;
      transform: translateY(-3px);
    }
    .back-to-top i {
      font-size: 24px;
      margin-top: -2px;
    }
  `
  document.head.appendChild(notificationStyles)

  // Back to top button functionality
  if (backToTopButton) {
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
})
