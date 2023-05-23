<hr/>

# Chatting Web app

카카오톡과 같은 구성의 영화 앱입니다.<br />
Axios를 사용해 외부 API(TMDB, Firebase)의 데이터를 전달받아 보여줍니다.<br />
Firebase로 회원가입, 로그인 및 소셜로그인 기능을 구현했습니다.
프로필 설정 및 채팅 기능에서 CRUD를 구현했습니다.<br />

<hr/>

<br />

### 제작에 사용된 기술목록
<a href="/" target="_blank"><img src="https://img.shields.io/badge/Javascript-EEE?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/></a> 
<a href="/" target="_blank"><img src="https://img.shields.io/badge/html5-EEE?style=for-the-badge&logo=html5&logoColor=E34F26"/></a> 
<a href="/" target="_blank"><img src="https://img.shields.io/badge/css3-EEE?style=for-the-badge&logo=css3&logoColor=1572B6"/></a> 
<a href="/" target="_blank"><img src="https://img.shields.io/badge/sass-EEE?style=for-the-badge&logo=sass&logoColor=CC6699"/></a>
<a href="/" target="_blank"><img src="https://img.shields.io/badge/react-EEE?style=for-the-badge&logo=react&logoColor=61DAFB"/></a>
<a href="/" target="_blank"><img src="https://img.shields.io/badge/firebase-EEE?style=for-the-badge&logo=firebase&logoColor=FFCA28"/></a>

<br />

### 주요 내용
- React로 만든 웹앱 입니다.
- 프로필 사진 및 프로필 배경 이미지를 수정할 수 있습니다.
- Firebase를 사용해 NoSQL 기반 서버리스 구조의 웹앱입니다.
- Firebase Authentication를 사용해 회원가입 및 로그인, 소셜로그인 기능을 구현했습니다.
- Firebase Database, Storage를 사용해 각계정의 프로필 및 프로필 배경사진 기능을 구현했습니다.
   - 앱에는 10명의 친구목록이 있습니다. 친구목록의 정보는 Jsonplaceholder에서 가져온 fake데이터파일을 일부 수정했습니다.

<br />

### 사용된 주요 라이브러리
- axios : api통신을 위해 사용했습니다.
- gh-pages: GitHub 페이지에 정적 리소스를 호스팅했습니다.
- react-router-dom 으로 React 기반 SPA의 라우팅을 관리합니다.
- fontawesome : 아이콘을 위해 사용한 라이브러리입니다.
- uuid : 각각의 채팅이 저장될때, 고유한 임의이 키값을 갖도록 하기위해 사용했습니다.

<br />

### 특이사항
- FirebaseAuth 에서 기본적으로 제공하는 uid에는 프로필사진을 저장합니다.
- 프로필의 배경사진의 이미지는 Firebase Storage에 저장되고, <br />
  Firebase DB에 배경사진이미지의 주소가 저장됩니다.
- Firebase DB에는 다음과 같은 구조 프로필사진 및 프로필 메시지가 저장됩니다.
```
    Firebase DB 
      └── 컬렉션(계정) 
         ├── 문서(프로필메시지)
         │    └── 필드(메시지)
         └─── 문서(프로필배경)
              └── 필드(프로필배경이미지주소)

```         
  
<br />

감사합니다.

<hr/>
