# My Simple Todo List(원티드 프리온보딩 프론트엔드 과제 제출용)

## 과제 설명
로그인 기능이 포함된 todo list 구현
<br /><br />

## 기술 스택
<div>
    <img src="https://img.shields.io/badge/HTML5-E34F26?&style=flat-square&logo=html5&logoColor=white">
    <img src="https://img.shields.io/badge/CSS-1572B6?&style=flat-square&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/Typescript-3178C6?&style=flat-square&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?&style=flat-square&logo=react&logoColor=white">
    <img src="https://img.shields.io/badge/Styled Component-DB7093?&style=flat-square&logo=styledcomponents&logoColor=white">
    <img src="https://img.shields.io/badge/Github Actions-2088FF?&style=flat-square&logo=githubactions&logoColor=white">
    <img src="https://img.shields.io/badge/Amazon S3-569A31?&style=flat-square&logo=amazons3&logoColor=white">
</div>
<br /><br />

## 구현 기능
* 회원가입(이메일 및 패스워드 유효성 검사 포함)
* 로그인(이메일 및 패스워드 유효성 검사 포함)
* 투두 리스트 추가, 삭제, 수정
* access token이 이상하거나 없을 때, 로그인 페이지로 redirect(axios interpretor로 response(401 error) 받아서 처리)
* access token이 로컬에 저장되어 있을 때, 바로 todo 페이지로 redirect
<br /><br />

## 배포(데모 영상 대체)
* github action, AWS S3 및 CloudFront를 활용하여 배포 CI CD 구축
* main branch에 push를 하면 자동으로 배포가 되는 시스템 구축
* <a href="https://d29gvxucyozyd5.cloudfront.net/">배포 사이트</a>
