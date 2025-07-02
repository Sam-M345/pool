const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const powerDisplay = document.getElementById('power');
const resetBtn = document.getElementById('resetBtn');

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 800;
const BALL_RADIUS = 15;
const POCKET_RADIUS = 25;
const FRICTION = 0.98;
const MIN_VELOCITY = 0.5;

let balls = [];
let pockets = [];
let cueStick = {
    x: 0,
    y: 0,
    angle: 0,
    power: 0,
    isAiming: false,
    startX: 0,
    startY: 0
};

let mousePos = { x: 0, y: 0 };
let isDragging = false;
let hasDragged = false;
let minDragDistance = 30;

class Ball {
    constructor(x, y, color, number = null) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = BALL_RADIUS;
        this.color = color;
        this.number = number;
        this.isMoving = false;
    }

    update() {
        if (Math.abs(this.vx) < MIN_VELOCITY && Math.abs(this.vy) < MIN_VELOCITY) {
            this.vx = 0;
            this.vy = 0;
            this.isMoving = false;
        } else {
            this.isMoving = true;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.checkPocketCollision();
        
        if (this.x - this.radius <= 0 || this.x + this.radius >= CANVAS_WIDTH) {
            this.vx = -this.vx * 0.8;
            this.x = Math.max(this.radius, Math.min(CANVAS_WIDTH - this.radius, this.x));
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= CANVAS_HEIGHT) {
            this.vy = -this.vy * 0.8;
            this.y = Math.max(this.radius, Math.min(CANVAS_HEIGHT - this.radius, this.y));
        }
    }

    checkPocketCollision() {
        for (let pocket of pockets) {
            const dx = this.x - pocket.x;
            const dy = this.y - pocket.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < POCKET_RADIUS - this.radius / 2) {
                this.x = -100;
                this.y = -100;
                this.vx = 0;
                this.vy = 0;
                this.isMoving = false;
                return true;
            }
        }
        return false;
    }

    draw() {
        if (this.x < 0 || this.y < 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (this.number !== null) {
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.number, this.x, this.y + 4);
        }
    }

    checkCollision(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.radius + other.radius) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            const vx1 = this.vx * cos + this.vy * sin;
            const vy1 = this.vy * cos - this.vx * sin;
            const vx2 = other.vx * cos + other.vy * sin;
            const vy2 = other.vy * cos - other.vx * sin;

            this.vx = vx2 * cos - vy1 * sin;
            this.vy = vy1 * cos + vx2 * sin;
            other.vx = vx1 * cos - vy2 * sin;
            other.vy = vy2 * cos + vx1 * sin;

            const overlap = this.radius + other.radius - distance;
            const separateX = cos * overlap * 0.5;
            const separateY = sin * overlap * 0.5;
            
            this.x += separateX;
            this.y += separateY;
            other.x -= separateX;
            other.y -= separateY;
        }
    }
}

function initPockets() {
    pockets = [
        { x: POCKET_RADIUS, y: POCKET_RADIUS },
        { x: CANVAS_WIDTH - POCKET_RADIUS, y: POCKET_RADIUS },
        { x: POCKET_RADIUS, y: CANVAS_HEIGHT / 2 },
        { x: CANVAS_WIDTH - POCKET_RADIUS, y: CANVAS_HEIGHT / 2 },
        { x: POCKET_RADIUS, y: CANVAS_HEIGHT - POCKET_RADIUS },
        { x: CANVAS_WIDTH - POCKET_RADIUS, y: CANVAS_HEIGHT - POCKET_RADIUS }
    ];
}

function initGame() {
    balls = [];
    initPockets();
    
    balls.push(new Ball(CANVAS_WIDTH / 4, CANVAS_HEIGHT * 0.7, '#fff', 'CUE'));
    
    const rackX = CANVAS_WIDTH / 2;
    const rackY = CANVAS_HEIGHT * 0.3;
    const ballSpacing = BALL_RADIUS * 2.1;
    
    const ballColors = ['#ff0000', '#ffff00', '#0000ff', '#ff8000', '#800080', '#008000', '#800000', '#000000'];
    let ballIndex = 0;
    
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= row; col++) {
            if (ballIndex < ballColors.length) {
                const x = rackX + row * ballSpacing * 0.87;
                const y = rackY - (row * ballSpacing * 0.5) + (col * ballSpacing);
                balls.push(new Ball(x, y, ballColors[ballIndex], ballIndex + 1));
                ballIndex++;
            }
        }
    }
}

function drawTable() {
    ctx.fillStyle = '#006400';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, CANVAS_WIDTH - 8, CANVAS_HEIGHT - 8);
    
    pockets.forEach(pocket => {
        ctx.beginPath();
        ctx.arc(pocket.x, pocket.y, POCKET_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.stroke();
    });
}

function drawCueStick() {
    if (cueStick.isAiming && balls[0]) {
        const cueBall = balls[0];
        const dx = mousePos.x - cueBall.x;
        const dy = mousePos.y - cueBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 20) {
            const stickLength = Math.min(distance + 50, 150);
            const angle = Math.atan2(dy, dx);
            
            const startX = cueBall.x - Math.cos(angle) * (cueBall.radius + 20);
            const startY = cueBall.y - Math.sin(angle) * (cueBall.radius + 20);
            const endX = startX - Math.cos(angle) * stickLength;
            const endY = startY - Math.sin(angle) * stickLength;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 6;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(endX - 20 * Math.cos(angle), endY - 20 * Math.sin(angle));
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 8;
            ctx.stroke();
            
            cueStick.power = Math.min(distance / 2, 100);
            powerDisplay.textContent = Math.round(cueStick.power);
        } else {
            // When stick is hidden, set power to 0
            cueStick.power = 0;
            powerDisplay.textContent = '0';
        }
    }
}

function handleCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            balls[i].checkCollision(balls[j]);
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    drawTable();
    
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });
    
    handleCollisions();
    drawCueStick();
    
    requestAnimationFrame(gameLoop);
}

// Function to get touch/mouse position
function getPointerPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

// Function to handle start of interaction (mouse down or touch start)
function handlePointerStart(e) {
    e.preventDefault(); // Prevent scrolling and other default behaviors
    const pos = getPointerPosition(e);
    mousePos.x = pos.x;
    mousePos.y = pos.y;
    
    if (balls[0] && !balls.some(ball => ball.isMoving)) {
        cueStick.isAiming = true;
        cueStick.startX = mousePos.x;
        cueStick.startY = mousePos.y;
        isDragging = true;
        hasDragged = false;
    }
}

// Function to handle movement (mouse move or touch move)
function handlePointerMove(e) {
    e.preventDefault(); // Prevent scrolling
    const pos = getPointerPosition(e);
    mousePos.x = pos.x;
    mousePos.y = pos.y;
    
    if (isDragging && cueStick.isAiming) {
        const dragDistance = Math.sqrt(
            Math.pow(mousePos.x - cueStick.startX, 2) + 
            Math.pow(mousePos.y - cueStick.startY, 2)
        );
        if (dragDistance > minDragDistance) {
            hasDragged = true;
        }
    }
}

// Function to handle end of interaction (mouse up or touch end)
function handlePointerEnd(e) {
    e.preventDefault();
    if (cueStick.isAiming && balls[0] && isDragging) {
        const cueBall = balls[0];
        const dx = mousePos.x - cueBall.x;
        const dy = mousePos.y - cueBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only shoot if user has dragged enough and power is greater than 0%
        if (distance > 20 && cueStick.power > 0 && hasDragged) {
            const power = Math.min(distance / 10, 30);
            const angle = Math.atan2(dy, dx);
            
            cueBall.vx = Math.cos(angle) * power;
            cueBall.vy = Math.sin(angle) * power;
        }
        
        cueStick.isAiming = false;
        cueStick.power = 0;
        powerDisplay.textContent = '0';
        isDragging = false;
    }
}

// Mouse events
canvas.addEventListener('mousedown', handlePointerStart);
canvas.addEventListener('mousemove', handlePointerMove);
canvas.addEventListener('mouseup', handlePointerEnd);

// Touch events for mobile
canvas.addEventListener('touchstart', handlePointerStart, { passive: false });
canvas.addEventListener('touchmove', handlePointerMove, { passive: false });
canvas.addEventListener('touchend', handlePointerEnd, { passive: false });

resetBtn.addEventListener('click', initGame);

initGame();
gameLoop();