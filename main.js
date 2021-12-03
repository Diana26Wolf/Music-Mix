monsters = ""
lwristX = 0
rwristX = 0
lwristY = 0
rwristY = 0
lwristScore = 0
rwristScore = 0

function preload() {
	monsters = loadSound("Monsters.mp3")
}

function setup() {
	canvas = createCanvas(450, 350)
	canvas.position(450, 250)

	video = createCapture(VIDEO)
	video.hide()

	posenet = ml5.poseNet(video, modelLoaded)
	posenet.on('pose', gotPoses)
}

function modelLoaded() {
	console.log("Model has been loaded!")
}

function draw() {
	push();
	translate(width, 0);
	scale(-1, 1);
	image(video, 0, 0, 450, 350)
	pop()
	//wrist positions
	fill("blue")
	stroke("blue")
	if (rwristScore > 0.2) {
		circle(rwristX, rwristY, 10)
		if (rwristY > 0 && rwristY < 100) {
			document.getElementById("speed").innerHTML = "Speed: 0.5x"
			monsters.rate(0.5)
		}
		if (rwristY > 100 && rwristY < 200) {
			document.getElementById("speed").innerHTML = "Speed: 1x"
			monsters.rate(1)
		}
		if (rwristY > 200 && rwristY < 300) {
			document.getElementById("speed").innerHTML = "Speed: 1.5x"
			monsters.rate(1.5)
		}
		if (rwristY > 300 && rwristY < 400) {
			document.getElementById("speed").innerHTML = "Speed: 2x"
			monsters.rate(2)
		}
		if (rwristY > 400 && rwristY < 500) {
			document.getElementById("speed").innerHTML = "Speed: 2.5x"
			monsters.rate(2.5)
		}
	}
	if (lwristScore > 0.2) {
		circle(lwristX, lwristY, 10)
		left = Number(lwristY)
		left2 = floor(left)
		leftv = left2 / 500
		document.getElementById("volume").innerHTML = "Volume: " + leftv
		monsters.setVolume(leftv)
	}
}

function songp() {
	monsters.play();
	monsters.setVolume(1);
	monsters.rate(1);
}

function gotPoses(results) {
	if (results.length > 0) {
		console.log(results)
		lwristX = results[0].pose.leftWrist.x;
		lwristY = results[0].pose.leftWrist.y;
		rwristX = results[0].pose.rightWrist.x;
		rwristY = results[0].pose.rightWrist.y;
		rwristScore = results[0].pose.keypoints[10].score;
		lwristScore = results[0].pose.keypoints[9].score;
	}
}