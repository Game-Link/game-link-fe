'use strict';

// document.write("<script src='jquery-3.6.1.js'></script>")
document.write("<script\n" +
    "  src=\"https://code.jquery.com/jquery-3.6.1.min.js\"\n" +
    "  integrity=\"sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=\"\n" +
    "  crossorigin=\"anonymous\"></script>")


var chatPage = document.querySelector('#chat-page');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;
var userId = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

// roomId 파라미터 가져오기
const url = new URL(location.href).searchParams;
const roomId = url.get('roomId');

function connect(event) {
    username = document.querySelector('#name').value.trim();
    userId = document.querySelector('#userId').value.trim();

    // chatPage 를 등장시킴
    chatPage.classList.remove('hidden');

    // 연결하고자하는 Socket 의 endPoint
    var socket = new SockJS('/ws-stomp');
    stompClient = Stomp.over(socket);

    // stompClient.connect(headers, onConnected, onError);
    stompClient.connect({}, onConnected, onError);

    event.preventDefault();

}

function onConnected() {

    // sub 할 url => /sub/chat/room/roomId 로 구독한다
    stompClient.subscribe('/sub/chatRoom/enter' + roomId, onMessageReceived);

    getPreviousMessageList();

    // 서버에 username 을 가진 유저가 들어왔다는 것을 알림
    // /pub/chat/enterUser 로 메시지를 보냄
    console.log("확인" + username);
    stompClient.send("/pub/chat/enterUser",
        {},
        JSON.stringify({
            "roomId": roomId,
            "userId": userId,
            sender: username,
            type: 'ENTER',
            fileType: 'NONE'
        })
    )

    connectingElement.classList.add('hidden');

}

// 유저 리스트 받기
// ajax 로 유저 리스를 받으며 클라이언트가 입장/퇴장 했다는 문구가 나왔을 때마다 실행된다.
function getUserList() {
    const $list = $("#list");

    $.ajax({
        type: "GET",
        url: "/chat/userlist",
        data: {
            "roomId": roomId
        },
        success: function (data) {
            var users = "";
            for (let i = 0; i < data.length; i++) {
                //console.log("data[i] : "+data[i]);
                users += "<li class='dropdown-item'>" + data[i] + "</li>"
            }
            $list.html(users);
        }
    })
}

function getPreviousMessageList() {

    $.ajax({
        type: "GET",
        url: "/chat/message/list",
        data: {
            "roomId": roomId
        },
        success: function (data) {
            console.log("이전 메시지들 확인" + data);
            for (let i = 0; i < data.length; i++) {
                let previousChatMessage = {
                    "roomId": data[i]["roomId"],
                    "userId": data[i]["userId"],
                    sender: data[i]["userNickname"],
                    message: data[i]["content"],
                    type: data[i]["messageType"],
                    messageTime: data[i]["createdAt"],
                    "fileName": data[i]["fileName"],
                    fileUrl: data[i]["fileUrl"],
                    fileType: data[i]["fileType"]
                };
                console.log(previousChatMessage);
                previousMessageReceived(JSON.stringify(previousChatMessage));
            }
        }
    })
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

// 메시지 전송때는 JSON 형식을 메시지를 전달한다.
function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            "roomId": roomId,
            "userId": userId,
            sender: username,
            message: messageInput.value,
            type: 'TALK',
            fileType: 'NONE'
        };

        stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

// API를 통해 메시지를 받을 때도 마찬가지로 JSON 타입으로 받으며,
// 넘어온 JSON 형식의 메시지를 parse 해서 사용한다.
function onMessageReceived(payload) {
    let chat = JSON.parse(payload.body);
    let messageElement = document.createElement('li');

    addMessageToTheChatRoom(chat, messageElement);
}

// 채팅방 입장 전에, 이전에 대화를 나눴던 메시지들을 보여주도록 처리하는 함수
function previousMessageReceived(message) {
    let chat = JSON.parse(message);
    let messageElement = document.createElement('li');

    addMessageToTheChatRoom(chat, messageElement);
}

function addMessageToTheChatRoom(chat, messageElement) {
    if (chat.type === 'ENTER' || chat.type === 'LEAVE') {  // chatType 이 enter, leave 라면 아래 내용
        messageElement.classList.add('event-message');
        getUserList();

    } else { // chatType 이 talk 라면 아래 내용
        messageElement.classList.add('chat-message');

        let timeElement = document.createElement('span');
        let timeText = document.createTextNode(formatLocalDateTime(chat.messageTime));
        timeElement.appendChild(timeText);
        messageElement.appendChild(timeElement);

        messageElement.appendChild(document.createElement('br'));

        let avatarElement = document.createElement('i');
        let avatarText = document.createTextNode(chat.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(chat.sender);
        messageElement.appendChild(avatarElement);

        let usernameElement = document.createElement('span');
        let usernameText = document.createTextNode(chat.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    let contentElement = document.createElement('p');

    // 만약 fileUrl 의 값이 null 이 아니라면 => chat 내용이 파일 업로드와 관련된 내용이라면
    // img 를 채팅에 보여주는 작업
    if(chat.fileUrl !== "" && chat.fileType === 'IMAGE'){
        let imgElement = document.createElement('img');
        imgElement.setAttribute("src", chat.fileUrl);
        imgElement.setAttribute("width", "300");
        imgElement.setAttribute("height", "300");

        let downBtnElement = document.createElement('button');
        downBtnElement.setAttribute("class", "btn fa fa-download");
        downBtnElement.setAttribute("id", "downBtn");
        downBtnElement.setAttribute("name", chat.fileName);
        downBtnElement.setAttribute("onclick", `downloadFile('${chat.roomId}', '${chat.fileName}', '${chat.fileUrl}')`);

        contentElement.appendChild(imgElement);
        contentElement.appendChild(downBtnElement);

    } else if (chat.fileUrl !== "" && chat.fileType === 'FILE') {
        let fileElement = document.createElement('span');
        fileElement.innerText = chat.fileName;
        fileElement.style.fontWeight = 'light';

        let downBtnElement = document.createElement('button');
        downBtnElement.setAttribute("class", "btn fa fa-download");
        downBtnElement.setAttribute("id", "downBtn");
        downBtnElement.setAttribute("name", chat.fileName);
        downBtnElement.setAttribute("onclick", `downloadFile('${chat.roomId}', '${chat.fileName}', '${chat.fileUrl}')`);

        contentElement.appendChild(fileElement);
        contentElement.appendChild(downBtnElement);

    } else{
        // 만약 fileUrl 의 값이 null 이라면
        // 이전에 넘어온 채팅 내용 보여주기
        let messageText = document.createTextNode(chat.message);
        contentElement.appendChild(messageText);
    }

    messageElement.appendChild(contentElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

function formatLocalDateTime(dateTimeString) {
    // 주어진 문자열을 Date 객체로 변환
    const dateTime = new Date(dateTimeString);

    // 시간대 추출
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    // 오전/오후 구분
    const meridiem = hours >= 12 ? "오후" : "오전";

    // 시간 변환 (24시간 형식에서 12시간 형식으로 변환)
    const formattedHours = hours % 12 || 12;

    // 시간대와 시간을 문자열로 결합
    return `${meridiem} ${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


document.addEventListener('DOMContentLoaded', function () {
    connect();
});

messageForm.addEventListener('submit', sendMessage, true)


/// 이미지 업로드 부분 ////
function uploadImage(){
    var images = $("#image")[0].files;
    var formData = new FormData();

    for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
    }
    formData.append("roomId", roomId);

    // ajax 로 multipart/form-data 를 넘겨줄 때는
    //         processData: false,
    //         contentType: false
    // 처럼 설정해주어야 한다.

    // 동작 순서
    // post 로 rest 요청한다.
    // 1. 먼저 upload 로 파일 업로드를 요청한다.
    // 2. upload 가 성공적으로 완료되면 data 에 upload 객체를 받고,
    // 이를 이용해 chatMessage 를 작성한다.
    $.ajax({
        type : 'POST',
        url : '/chat/image/upload',
        data : formData,
        processData: false,
        contentType: false
    }).done(function (data){
        for (let i = 0; data.length; i++) {
            var chatMessage = {
                "roomId": roomId,
                "userId": data[i]["userId"],
                sender: username,
                type: 'TALK',
                "fileName": data[i]["fileName"], // 원본 파일 이름
                fileUrl: data[i]["fileUrl"], // 저장된 파일 경로
                fileType: data[i]["fileType"]
            };

            // 해당 내용을 발신한다.
            stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        }
    }).fail(function (error){
        alert(error);
    })
}

/// 파일 업로드 부분 ////
function uploadFile(){
    var files = $("#file")[0].files;
    var formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    formData.append("roomId", roomId);

    $.ajax({
        type : 'POST',
        url : '/chat/file/upload',
        data : formData,
        processData: false,
        contentType: false
    }).done(function (data){
        for (let i = 0; data.length; i++) {
            var chatMessage = {
                "roomId": roomId,
                "userId": data[i]["userId"],
                sender: username,
                type: 'TALK',
                "fileName": data[i]["fileName"], // 원본 파일 이름
                fileUrl: data[i]["fileUrl"], // 저장된 파일 경로
                fileType: data[i]["fileType"]
            };

            // 해당 내용을 발신한다.
            stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        }
    }).fail(function (error){
        alert(error);
    })
}

// 이미지,파일 다운로드 부분 //
// 버튼을 누르면 downloadFile 메서드가 실행됨
// 다운로드 url 은 /chat/download+원본파일이름
function downloadFile(roomId, fileName, url){
    // get 으로 rest 요청한다.
    $.ajax({
        url: "/chat/download/"+fileName, // 요청 url 은 download/{name}
        data: {
            "roomId": roomId,
            "fileUrl" : url
        },
        dataType: 'binary', // 파일 다운로드를 위해서는 binary 타입으로 받아야한다.
        xhrFields: {
            'responseType': 'blob' // 여기도 마찬가지
        },
        success: function(data) {
            var link = document.createElement('a');
            link.href = URL.createObjectURL(data);
            link.download = fileName;
            link.click();
        }
    });
}