#### 국내 최초 현업 개발자 실무 개발 심화 학습 
## 패스트캠퍼스 <시크릿코드-프론트엔드 실무 완성편>


- 프론트엔드 개발자라면 한 번 쯤 고민했을법한 `실무 개발 이슈 150개 +` 

- 최신 스택 기술이 모두 포함된 `코드파일 1000개 +`

- 내 손으로 직접 쳐가면서 학습해가는 `나만의 코드 3000줄 +`

- 국내 주요 IT 리드급 개발자들의 `도합 100년치 노하우`

[상세페이지] (https://www.fastcampus.co.kr/FE_online_secretcode)


## Case3 : Infinite scroll


### 케이스 주제
Q. 무한 스크롤 목록뷰를 구현하세요.


### 기능 요구사항
1. 최초에는 20개의 목록을 불러옵니다.
2. 스크롤을 최하단으로 이동시 ‘loading’ 상태표시가 나타나며, 이후의 20개 목록을 더 가져옵니다.
3. 로딩 완료시 ‘loading’ 표시가 사라지며, 가져온 목록이 하단에 추가됩니다. (무한 반복)


### 기능 작동 이미지
1. 최초 접속시

   <br/>
   <img width="600px" src="./example_image.gif"/>


### 실행 방법 / 풀이 방법 안내
> 문제 풀기 방식 :
>
> 
> 1. 터미널에서 각 문제 폴더 디렉토리로 이동하여 npm install로 의존성을 설치
> 2. package.json을 참고하여, 명시된 scripts 명령어로 개발서버 실행.
> 3. 코드 수정하면서 문제 해결하세요

기본 번들러로 `parcel`을 사용했습니다. - `react` 문제의 경우, `react-scripts` 사용. 문제 디렉토리에서 `npm start` 또는 `npx parcel index.html watch`로 개발서버를 실행하세요.


### 문제
q1. Javascript - `scrollTop`, `clientHeight`, `scrollHeight` 등의 요소의 프로퍼티를 활용하여 해결하시오.

q2. Javascript - 앞서 작성한 코드에 debounce를 적용해 기능을 구현하시오.

q3. Javascript - 다음으로 IntersectionObserver를 활용해 기능을 구현하시오.

q4. React - 마지막으로, 리액트에서 IntersectionObserver를 활용해 기능을 구현하시오.


### 주요 학습 키워드
- 스크롤 동작 감지, 이벤트 리스너, scrollTop, mousewheel, IntersectionObserver, useEffect


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/q1_js/index.js`

**q2**
`./question/q2_js_debounce_trottle/index.js`
`./question/q2_js_debounce_trottle/util.js`

**q3**
`./question/q3_js_Intersection_Observer/index.js`

**q4**
`./question/q4_react_Intersaction_Observer/src/FetchMore.js`


### 실행 방법 및 의존성 모듈 설치
**q1**
경로
`./question/q1_js`

터미널
```bash
  $ npm install
  $ npm start
```


**q2**
경로
`./question/q2_js_debounce_trottle`

터미널
```bash
  $ npm install
  $ npm start
```

**q3**
경로
`./question/q3_js_Intersection_Observer`

터미널
```bash
  $ npm install
  $ npm start
```

**q4**
경로
`./question/q4_react_Intersaction_Observer`

터미널
```bash
  $ npm install
  $ npm start
```



##### Copyright by FASTCAMPUS