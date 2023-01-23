# Authentication Server 🛰
## 📄 프로젝트 목적 및 설명
* ### 목적
  * 서버가 어떻게 구성되어있고 client부분과 어떻게 통신하는지에 대해 이해하기 위해 진행
  * mongodb를 이용해 데이터 관리
  * 간단한 인증과정 및 CRUD지만 서버를 만들어 보고 싶어서 진행하였다.
* ### 설명
  * #### Auth
    * post를 이용해 데이터 요청 구현 
    * Joi를 이용해서 validation 검증 구현
    * bcrypt라이브러리를 이용해 비밀번호 해시 구현
    * jwt를 이용해서 토큰 생성 및 할당
  * #### Post
    * get, post, put, delete메소드를 이용해 resource에 접근 가능하도록 Rest API 구현
  
---
## 🛠 개발 기간 및 사용 기술

- **개발 기간** : 2022.04.20 ~ 2022.05.04
- **사용 기술**  
  - MongoDB
  - Nodejs
  - Express

--- 
 ## 🤩 새로 배우거나 집중적으로 공부한 것

- Nodejs Express를 이용해서 서버 구성
- 회원가입과 로그인을 위한 데이터 통신
- MongDB와 연동하여 데이터 통신 및 저장
- POST를 CRUD하기 위한 api 구현
- 비밀번호를 Hash 이해 및 구현
- jwt를 이용한 토큰 인증 방식
- joi를 이용한 유효성 검사

--- 
## 🔧 이슈 및 해결

- 회원가입을 구현할 때 비밀번호를 어떻게 보안해야하는지 몰랐지만 hash처리를 해서 비밀번호를 노출시키지 않을 수 있다는 것을 깨달음
```
 // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // 새로운 유저 만들기
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
```

- token을 생성해서 로그인 시 id에 토큰을 할당
```
// 토큰 생성 및 할당
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header("auth-token", token).send(token);

    res.status(200).status({ data: token, message: "로그인 성공" });
  } catch (error) {
    res.status(500).send({ message: "서버 에러" });
  }
```
