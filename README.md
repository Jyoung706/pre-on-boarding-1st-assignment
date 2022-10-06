# 바딧 - 회원관리 및 운동 능력 기록 앱 만들기
![JavaScript Badge](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;
## 개요
원티드 프리온보딩 백엔드 코스 1차 과제 입니다. Node.js와 RDB를 이용하여 회원관리 및 운동 능력 기록 앱을 만들었습니다.
- 개발기간: 2022.10.04 - 2022.10.07
- 개발인원: 김윤희, 박정용, 오인환, 음정민(PM), 전준영 (6명)



## 프로젝트 실행 방법

- 사전에 Git, node, MySQL이 설치되어있어야 합니다.

```shell
# 레포지토리 클론
$ git clone https://github.com/J-EUM/pre-on-boarding-1st-assignment.git

# 접속
$ cd pre-on-boarding-1st-assignment

# 패키지 설치
$ npm install

# 데이터베이스 생성
mysql> create database 데이터베이스명 character set utf8mb4 collate utf8mb4_general_ci; 

# .env파일 만들기(데이터베이스와 연결)
MYSQL_HOST = ip
MYSQL_PORT = 포트번호
MYSQL_USERNAME = 사용자명
MYSQL_PASSWORD = 비밀번호
MYSQL_DATABASE = 데이터베이스명

# 데이터베이스 테이블 생성
$ npx dbmate up

# 프로젝트 실행
$ node server.js

# server start : http://localhost:8000
```


## 프로젝트 구조
### DB모델링
![image](https://user-images.githubusercontent.com/97498663/194228536-bf8dac2d-612b-411b-b32b-e27f66263077.png)





## 구현 기능에 대한 소개
1. 회원
    - 회원 정보 등록하기
    - 회원 목록 가져오기
    - 특정 회원 정보 가져오기
    - 특정 회원 정보 수정하기
    - 특정 회원 삭제하기
        - 회원 정보는 실제로 삭제하지 않고, 비식별화 처리합니다.
        - 회원의 측정 데이터는 삭제되어서는 안됩니다.
2. 측정 기록
    - 특정 회원의 측정 기록들(목록) 가져오기
    - 특정 측정 기록 및 측정 데이터 가져오기
    - 특정 회원에 대한 측정 기록과 측정 데이터 생성
    - 측정 기록 삭제하기
        - 반드시 연결되어 있는 측정 데이터도 같이 삭제되어야 합니다.

## 기타 소개하고 싶은 내용들
