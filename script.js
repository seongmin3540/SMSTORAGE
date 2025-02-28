// 로딩 화면 숨기기
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "none"; // 로딩 화면 숨기기
    displayUserList(); // 페이지 로드 시 사용자 목록 표시
});

// 이름 저장 기능
const submitButton = document.getElementById("submitButton");
const userNameInput = document.getElementById("userName");
const outputMessage = document.getElementById("outputMessage");

submitButton.addEventListener("click", function() {
    const userName = userNameInput.value.trim();

    if (userName) {
        // 기존 사용자 목록 불러오기
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        // 사용자 이름 추가
        users.push(userName);
        
        // 로컬 스토리지에 업데이트된 사용자 목록 저장
        localStorage.setItem("users", JSON.stringify(users));

        outputMessage.textContent = `${userName}님이 저장되었습니다.`;
        userNameInput.value = ''; // 입력창 비우기

        // 사용자 목록 갱신
        displayUserList();
    } else {
        outputMessage.textContent = '이름을 입력하세요.';
    }
});

// 사용자 목록을 화면에 출력하는 함수
function displayUserList() {
    const userList = document.getElementById("userList");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userList.innerHTML = ''; // 기존 목록 지우기

    if (users.length === 0) {
        userList.innerHTML = "<p>저장된 사용자 없음</p>";
    } else {
        // 사용자 목록 추가
        users.forEach(user => {
            const listItem = document.createElement("li");
            listItem.textContent = user;
            userList.appendChild(listItem);
        });
    }
}

// 저장된 데이터 삭제 기능
const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function() {
    localStorage.removeItem("users");
    outputMessage.textContent = '저장된 데이터가 삭제되었습니다.';
    displayUserList(); // 목록 갱신
});

// 다크 모드 토글 기능
const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "라이트 모드로 변경";
    } else {
        themeButton.textContent = "다크 모드로 변경";
    }
});
