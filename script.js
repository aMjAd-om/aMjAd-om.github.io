document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Particle Animation for Header
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 150;
    const connectionDistance = 150;
    const mouseRadius = 120;

    // Mouse position tracking
    const mouse = {
        x: undefined,
        y: undefined,
        radius: mouseRadius
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.baseSize = this.size;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            
            // Use color palette that fits AI theme
            const colors = [
                'rgba(0, 219, 222, 0.8)',   // Cyan
                'rgba(252, 0, 255, 0.8)',   // Magenta
                'rgba(255, 255, 255, 0.8)', // White
                'rgba(81, 45, 168, 0.8)',   // Purple
                'rgba(0, 150, 255, 0.8)'    // Blue
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.density = Math.random() * 30 + 1;
        }
        
        update() {
            // Normal movement
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary collision
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            
            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                const directionX = forceDirectionX * force * this.density * -1;
                const directionY = forceDirectionY * force * this.density * -1;
                
                this.speedX += directionX;
                this.speedY += directionY;
                
                // Limit speed
                const maxSpeed = 5;
                this.speedX = Math.max(Math.min(this.speedX, maxSpeed), -maxSpeed);
                this.speedY = Math.max(Math.min(this.speedY, maxSpeed), -maxSpeed);
                
                // Increase size on mouse hover
                this.size = this.baseSize + 2;
            } else {
                // Return to base size
                if (this.size > this.baseSize) {
                    this.size -= 0.1;
                }
            }
            
            // Add some random movement
            this.speedX += (Math.random() - 0.5) * 0.01;
            this.speedY += (Math.random() - 0.5) * 0.01;
            
            // Apply friction to slow particles down
            this.speedX *= 0.98;
            this.speedY *= 0.98;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function connectParticles() {
        const opacityValue = 0.5;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    // Calculate opacity based on distance
                    const opacity = 1 - (distance / connectionDistance);
                    
                    // Create gradient for connection line
                    const gradient = ctx.createLinearGradient(
                        particlesArray[a].x, 
                        particlesArray[a].y, 
                        particlesArray[b].x, 
                        particlesArray[b].y
                    );
                    
                    gradient.addColorStop(0, particlesArray[a].color.replace('0.8', opacity * opacityValue));
                    gradient.addColorStop(1, particlesArray[b].color.replace('0.8', opacity * opacityValue));
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function initParticles() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    // Generate Neural Network visualization
    function createNeuralNetworkVisualization() {
    const nodesContainer = document.querySelector('.nodes-container');
    if (!nodesContainer) return;
    
    const numNodes = 35; // Number of nodes
    const numLayers = 16; // Number of layers
    const nodesPerLayer = Math.ceil(numNodes / numLayers);
    
    // Create nodes
    const nodes = [];
    for (let layer = 0; layer < numLayers; layer++) {
        for (let i = 0; i < nodesPerLayer; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            
            // Position nodes in layers
            const xPercent = 10 + (layer * 80 / (numLayers - 1));
            const yPercent = 10 + (i * 80 / (nodesPerLayer - 1));
            
            // Add some randomness to positions
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            
            node.style.left = `${xPercent + randomX}%`;
            node.style.top = `${yPercent + randomY}%`;
            
            // Animate nodes with pulse effect
            node.style.animation = `pulse 3s infinite ease-in-out ${Math.random() * 2}s`;
            
            nodesContainer.appendChild(node);
            nodes.push({
                element: node,
                x: xPercent + randomX,
                y: yPercent + randomY,
                layer
            });
        }
    }
    
    // Create connections between layers
    for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];
        
        // Connect to nodes in next layer
        if (currentNode.layer < numLayers - 1) {
            const nextLayerNodes = nodes.filter(node => node.layer === currentNode.layer + 1);
            
            // Connect to a few random nodes in next layer
            const numConnections = Math.floor(Math.random() * 3) + 1;
            const shuffledNodes = [...nextLayerNodes].sort(() => 0.5 - Math.random());
            
            for (let j = 0; j < Math.min(numConnections, shuffledNodes.length); j++) {
                const targetNode = shuffledNodes[j];
                
                const connection = document.createElement('div');
                connection.classList.add('connection');
                
                // Calculate position and dimensions for connection line
                const startX = currentNode.x;
                const startY = currentNode.y;
                const endX = targetNode.x;
                const endY = targetNode.y;
                
                // Calculate distance and angle
                const dx = endX - startX;
                const dy = endY - startY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);
                
                // Set connection properties
                connection.style.width = `${distance}%`;
                connection.style.height = '1px';
                connection.style.left = `${startX}%`;
                connection.style.top = `${startY}%`;
                connection.style.transform = `rotate(${angle}rad)`;
                
                // Add pulsing animation to connection
                connection.style.animation = `pulse-connection 4s infinite ${Math.random() * 3}s`;
                
                nodesContainer.appendChild(connection);
            }
        }
    }
    
    // Add CSS animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.5); opacity: 1; }
            }
            
            @keyframes pulse-connection {
                0%, 100% { opacity: 0.1; }
                50% { opacity: 0.3; }
            }
        </style>
    `);
}

    // Initialize all visualizations
    initParticles();
    animateParticles();
    createNeuralNetworkVisualization();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
});