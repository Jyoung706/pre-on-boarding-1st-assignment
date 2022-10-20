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
    	- 유저 전체 리스트를 GET 방식으로 조회 해옵니다.
    
    - 특정 회원 정보 가져오기
        - user_id 값을 Path Variable로 받아서 요청 들어온 회원의 정보를 가져옵니다.
    - 특정 회원 정보 수정하기

      **필수 값들을 요청보내면 특정 회원에 대한 정보를 해당 값들로 수정합니다.**

          1. 존재하지 않는 유저에 대한 요청이면 에러가 발생합니다.
          
          2. 비식별화된 유저에 대한 요청이면 에러가 발생합니다.
          
          3. 필수 값들이 모두 존재하지 않으면 에러가 발생합니다.

          4. 값들이 유효성 검사 조건에 맞지 않으면 에러가 발생합니다.
        
    
    - 특정 회원 삭제하기
        - 회원 정보는 실제로 삭제하지 않고, 비식별화 처리합니다.
        - 회원의 측정 데이터는 삭제되어서는 안됩니다.

2. 측정 기록
    - 특정 회원의 측정 기록들(목록) 가져오기
        - user_id 값을 Path Variable로 받아서 요청 들어온 회원의 측정 기록들을 가져옵니다.
    
    - 특정 측정 기록 및 측정 데이터 가져오기
      
      **측정 기록을 조회하면 해당 기록의 데이터와 유저 정보를 함께 불러옵니다.**
		
	      1. 요청하는 기록이 존재하지 않을 경우 에러가 발생합니다. 
          
          2 . 요청하는 기록이 비식별화된 유저의 기록일 경우 에러가 발생합니다.
        


    
    - 특정 회원에 대한 측정 기록과 측정 데이터 생성
    
       **필수 값들을 요청보내면 특정 회원에 대한 측정기록 및 측정 데이터를 데이터베이스에 생성 및 저장하는 기능입니다.**
	
	    user의 id 번호를 headers에, 그리고  체중, 데이터 타입, 타입에 대한 수치 를 body에 담아 요청을 보내면 record 테이블에 user_id와 weight, created_at이 생성됩니다.           
        생성된 record의 id 를 가져와 record_data 테이블에 나머지 데이터들이 입력됩니다.
	    
        record 테이블에 먼저 입력되는 과정이 있고 그 후에 조회하여 id를 가져와 다시 입력하는 과정이 있기 때문에 트랜잭션을 추가했습니다.
	    
        제약사항에 대해 설명하겠습니다.
	
	      1. 하나의 기록에는 측정데이터의 종류가 하나 혹은 그 이상이 되며 중복되어 들어가지 못한다.
		
		   하나의 측정데이터로 요청이 올 경우이지만 어깨골격과 어깨신전에 대한 요청이 들어온다면 두개는 세트로 입력되어야 한다는 에러를 발생시키도록 처리했습니다.
	 	   여러가지의 측정데이터로 요청이 들어올 경우에도 어깨골격, 어깨신전에 대한 데이터가 하나만 들어온다면 두개는 세트로 입력되어야 한다는 에러를 발생시킵니다.
		
	      2 . 데이터 타입에 대한 수치
	
		    데이터 타입마다 정해져있는 범위안에서의 수치로 요청오지 않을경우
		    에러메세지를 type id와 그에대한 범위를 알려주는 에러를 보내도록 처리했습니다.
    
    - 측정 기록 삭제하기
        
       **측정 기록을 삭제하려는 유저의 id를 headers에, 그리고 삭제하려는 record 의 id를 path params에 담아 요청을 보내면
	   그 유저에 대한 기록이 데이터 베이스 내에 존재하는지 먼저 확인하는 과정을 거치고 이후에 존재한다면 삭제하는 기능입니다.**
       
       만약 유저 id와 그 유저에 대한 기록물의 id가 데이터베이스 내에 존재하지 않는다면 존재하지 않는 기록이라는 에러메세지를 반환합니다.
	   정상적으로 삭제되었을 경우에는 204 상태코드를 반환합니다.
****        
       요청과 응답에 대한 자세한 결과, 데이터 타입은 API docs를 참고해 주십시오.

## API doc
김윤희 - [https://documenter.getpostman.com/view/22727251/2s83zfQ5Ti](https://documenter.getpostman.com/view/22727251/2s83zfQ5Ti)

- 특정 회원의 측정 기록(목록들) 가져오기
- 특정 회원의 정보 가져오기

박정용 - [https://documenter.getpostman.com/view/22204904/2s83zfQR1z](https://documenter.getpostman.com/view/22204904/2s83zfQR1z)

- 회원 등록
- 특정 회원 삭제하기

음정민 - [https://documenter.getpostman.com/view/22263423/2s83zfQQQf](https://documenter.getpostman.com/view/22263423/2s83zfQQQf)

- 특정 회원 정보 수정하기
- 특정 측정 기록 및 측정 데이터 가져오기

전준영 - [https://documenter.getpostman.com/view/22723440/2s83zdxS6U](https://documenter.getpostman.com/view/22723440/2s83zdxS6U)

- 특정 회원에 대한 측정 기록과 측정 데이터 생성
- 측정기록 삭제하기

오인환 - [https://documenter.getpostman.com/view/23509106/2s83zfRRK2](https://documenter.getpostman.com/view/23509106/2s83zfRRK2)

- 회원 목록 가져오기
