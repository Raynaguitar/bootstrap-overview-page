// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Chart
    const ctx = document.getElementById('trendsChart');
    
    if (ctx) {
        const trendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                datasets: [{
                    label: 'Trends',
                    data: [20, 35, 45, 30, 50, 55, 70, 65, 80, 75, 85, 70],
                    borderColor: '#3751FF',
                    backgroundColor: 'rgba(55, 81, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#3751FF',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#363740',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            color: '#F0F1F7',
                            drawBorder: false
                        },
                        ticks: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // Add interactivity to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            statCards.forEach(c => c.classList.remove('stat-card-active'));
            this.classList.add('stat-card-active');
        });
    });

    // Task checkbox functionality
    const taskCheckboxes = document.querySelectorAll('.form-check-input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#9FA2B4';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '#252733';
            }
        });
    });

    // Add task input functionality
    const taskInput = document.querySelector('.form-control[placeholder="Create new task"]');
    if (taskInput) {
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const taskList = document.querySelector('.list-group');
                const newTask = document.createElement('li');
                newTask.className = 'list-group-item d-flex align-items-center';
                newTask.innerHTML = `
                    <input class="form-check-input me-2" type="checkbox">
                    <label class="form-check-label flex-grow-1">
                        ${this.value}
                    </label>
                    <span class="badge bg-light text-muted">NEW</span>
                `;
                taskList.appendChild(newTask);
                this.value = '';
            }
        });
    }

    // Console log for debugging
    console.log('Dashboard initialized successfully!');
    
});

// Quick task form
    const quickTaskForm = document.getElementById('quickTaskForm');
    if (quickTaskForm) {
        quickTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('quickTaskInput');
            const taskList = document.getElementById('taskList');
            
            if (input.value.trim() !== '') {
                const newTask = document.createElement('li');
                newTask.className = 'list-group-item d-flex align-items-center';
                const taskId = 'task' + Date.now();
                
                newTask.innerHTML = `
                    <input class="form-check-input me-2" type="checkbox" id="${taskId}">
                    <label class="form-check-label flex-grow-1" for="${taskId}">
                        ${input.value}
                    </label>
                    <span class="badge bg-success">NEW</span>
                `;
                
                taskList.appendChild(newTask);
                input.value = '';
                
                // Success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
                successMsg.style.zIndex = '9999';
                successMsg.innerHTML = `
                    Task added successfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }
        });
    }

    // Advanced task form (modal)
    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('taskTitle').value;
            const priority = document.getElementById('taskPriority').value;
            const taskList = document.getElementById('taskList');
            
            let badgeClass = 'bg-secondary';
            let badgeText = 'NORMAL';
            
            switch(priority) {
                case 'urgent':
                    badgeClass = 'bg-danger';
                    badgeText = 'URGENT';
                    break;
                case 'high':
                    badgeClass = 'bg-warning text-dark';
                    badgeText = 'HIGH';
                    break;
                case 'low':
                    badgeClass = 'bg-info';
                    badgeText = 'LOW';
                    break;
            }
            
            const newTask = document.createElement('li');
            newTask.className = 'list-group-item d-flex align-items-center';
            const taskId = 'task' + Date.now();
            
            newTask.innerHTML = `
                <input class="form-check-input me-2" type="checkbox" id="${taskId}">
                <label class="form-check-label flex-grow-1" for="${taskId}">
                    ${title}
                </label>
                <span class="badge ${badgeClass}">${badgeText}</span>
            `;
            
            taskList.appendChild(newTask);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
            modal.hide();
            
            // Reset form
            addTaskForm.reset();
            
            // Success message
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
            successMsg.style.zIndex = '9999';
            successMsg.innerHTML = `
                Task created successfully!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }