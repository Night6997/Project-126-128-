song1="";
song2="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWrist_Score=0;
rightWrist_Score=0;

function preload(){

    song1=loadSound("music1.mp3");
    song2=loadSound("music2.mp3");
    song1_Status=song1.isPlaying()
    song2_Status=song2.isPlaying();

}

function setup(){

    canvas=createCanvas(600,500);
    canvas.position(660,300);

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded(){

    console.log("PoseNet is initialized");

}

function gotPoses(results){

    if(results.length>0){

        console.log(results);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+leftWristX+", left wrist y = "+leftWristY);
        
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+rightWristX+", right wrist y = "+rightWristY);

        leftWrist_Score=results[0].pose.keypoints[9].score;
        rightWrist_Score=results[0].pose.keypoints[10].score;
        console.log("Left wrist score = "+leftWrist_Score+", right wrist score = "+rightWrist_Score);


    }

}

function draw(){

    image(video,0,0,600,500);
    if(leftWrist_Score>0.2){

        fill("#20d6be");
        stroke("#20d6be");
        circle(leftWristX,leftWristY,20);

        song.stop();
        if(song1_Status=="false"){

            song.play(song1);
            document.getElementById("songName_btn").innerHTML="Song playing now is song 1";
            console.log("MUSIC IS PLAYING");

        }

    }
    if(rightWrist_Score>0.2){

        fill("#20d6be");
        stroke("#20d6be");
        circle(rightWristX,rightWristY,20);

        song.stop();
        if(song2_Status=="false"){

            song.play(song2);
            document.getElementById("songName_btn").innerHTML="Song playing now is song 2";
            console.log("MUSIC IS PLAYING");

        }

    }

}