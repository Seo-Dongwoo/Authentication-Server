# Login Server 🛰
- 회원가입과 로그인 기능을 구현하기 위한 서버
- 게시물의 CRUD를 구현하기 위한 서버
- MongoDB와 연결하여 데이터베이스에 저장


개발 기간 및 사용 기술
---
- 개발 기간 : 2022.04.20 ~ 2022.05.04

- 사용 기술 :  MongoDB, Nodejs, Express


새로 배운 것
--- 
- Nodejs Express를 이용해서 서버 구성
- 회원가입과 로그인을 위한 데이터 통신
- MongDB와 연동하여 데이터 통신 및 저장
- POST를 CRUD하기 위한 api 구현
- 비밀번호를 Hash하기
- jwt를 이용한 토큰 인증 방식
- 유효성 검사

경험했던 문제점
---
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

- 로그인할 때 id값에 token을 할당하기 위해서 구글링을 통해 해결
```
// 토큰 생성 및 할당
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header("auth-token", token).send(token);

    res.status(200).status({ data: token, message: "로그인 성공" });
  } catch (error) {
    res.status(500).send({ message: "서버 에러" });
  }
```




