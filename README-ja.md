<p align="center">
  <a href="https://github.com/no4h-d3v/formruler/blob/master/README.md">English README is here</a>
</p>

<h1 align="center">FormRulerへようこそ 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> フォームバリデーションライブラリ

## 目次

1. [インストール](#インストール)
2. [基本的な使い方](#基本的な使い方)
3. [利用可能な設定](#利用可能な設定)
4. [利用可能なルール](#利用可能なルール)
5. [バリデーションのタイミング](#バリデーションのタイミング)
6. [CSSクラス](#cssクラス)
7. [ライセンス](#ライセンス)

## インストール

npmでインストール:

```
npm install formruler
```

またはHTMLに直接含める:

```
<script src="path/to/formruler.js"></script>
```

## 使い方

```
$('#myForm').formruler({
    rules: {
        username: {
            required: true,
            minLength: 3
        },
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        username: {
            required: "Username is required",
            minLength: "Username must be at least 3 characters long"
        },
        email: {
            required: "Email is required",
            email: "Please enter a valid email address"
        }
    },
    onValid: function() {
        console.log("Form is valid");
    },
    onInvalid: function() {
        console.log("Form has errors");
    }
});
```

## 利用可能な設定

| 設定              | 使用例                                                | 説明                                           |
|--------------------|--------------------------------------------------------|-------------------------------------------------------|
| rules              | rules: {<br>&nbsp;&nbsp;&nbsp;&nbsp;username: { required: true }<br>}                     | 各フィールドのバリデーションルールを定義します。`required`、`minLength`、`email`などのバリデーション基準を指定します。 |
| messages           | messages: {<br>&nbsp;&nbsp;&nbsp;&nbsp;username: { required: "Username is required" }<br>}   | バリデーションのカスタムエラーメッセージ。動的な値のプレースホルダー（`{minLength}`、`{maxLength}`など）を使用できます。 |
| customValidators   | customValidators: {<br>&nbsp;&nbsp;&nbsp;&nbsp;myCustomRule: function(value, input) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return { isValid: value.startsWith("prefix_"),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message: "Field must start with 'prefix_'" };<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>} | カスタムバリデーション関数。`isValid`（ブール値）と`message`（文字列）プロパティを持つオブジェクトを返す必要があります。 |
| feedbackSelectors  | feedbackSelectors: {<br>&nbsp;&nbsp;&nbsp;&nbsp;username: "#username-error"<br>}                      | エラーメッセージ表示用のカスタムセレクタ。デフォルトでは`.invalid-feedback`クラスの要素を使用します。 |
| triggerButtonId    | triggerButtonId: "submitBtn"                                          | フォームバリデーションをトリガーするボタンのID。`type="button"`の外部ボタンを使用できます。 |
| skipRulesIf        | skipRulesIf: {<br>&nbsp;&nbsp;&nbsp;&nbsp;additionalInfo: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dependentId: "needsAdditionalInfo",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;condition: "empty",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rulesToSkip: ["required", "minLength"]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>} | 特定のバリデーションルールをスキップする条件。依存フィールドと、ルールを動的に有効/無効にする条件を定義します。使用可能な条件は次のとおりです： <br> - "notEmpty": 依存フィールドが空でない場合、指定されたルールをスキップします。 <br> - "empty": 依存フィールドが空の場合、指定されたルールをスキップします。 <br> さらに、条件の下でフィールドのすべてのバリデーションルールをスキップするために`rulesToSkip`で"all"を指定できます。 |
| onValid            | onValid: function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log("Form is valid");<br>}          | フォームが有効な場合に実行されるコールバック関数。フォームの送信やその他の処理を行うために使用します。 |
| onInvalid          | onInvalid: function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log("Form has errors");<br>}        | フォームが無効な場合に実行されるコールバック関数。エラーメッセージの表示や送信の防止に使用します。 |

## 利用可能なルール

| ルール               | 使用例                      | 説明                                           |
|--------------------|------------------------------|-------------------------------------------------------|
| required           | required: true               | フィールドは空であってはならない。入力値が空または空白のみの場合にトリガーされます。 |
| minLength          | minLength: 3                 | 最小文字数。必要な最小文字数を指定します。 |
| maxLength          | maxLength: 10                | 最大文字数。許可される最大文字数を指定します。 |
| rangeLength        | rangeLength: [3, 10]         | 文字数が範囲内であること。`[min, max]`の配列として定義します。 |
| email              | email: true                  | 有効なメールアドレスである必要があります。標準のメール形式を使用します。 |
| url                | url: true                    | 有効なURLである必要があります。標準のURL形式（`http`、`https`、`ftp`）を確認します。 |
| numeric            | numeric: true                | 数字（整数または小数）である必要があります。数字と小数点を許可します。 |
| integer            | integer: true                | 整数でなければなりません。正または負の整数のみを許可します。 |
| min                | min: 18                      | 最小数値。許可される最小値を指定します。 |
| max                | max: 65                      | 最大数値。許可される最大値を指定します。 |
| range              | range: [18, 65]              | 数値が範囲内であること。`[min, max]`の配列として定義します。 |
| pattern            | pattern: "^[a-zA-Z0-9]+$"    | 正規表現パターンに一致する必要があります。入力値と一致する正規表現パターンを定義します。 |
| alphaNum           | alphaNum: true               | 英数字のみを含む必要があります。特殊文字やスペースは許可されません。 |
| fullWidthChars     | fullWidthChars: true         | 全角文字のみを含む必要があります。全角のUnicode文字を確認します。 |
| noNumbers          | noNumbers: true              | 数字を含んではならない。入力内のすべての数字を禁止します。 |
| phone              | phone: true                  | 有効な電話番号である必要があります。標準の電話番号形式を確認します。 |
| postalCode         | postalCode: true             | 有効な郵便番号である必要があります。`123-4567`などの標準の郵便番号形式を確認します。 |
| date               | date: true                   | `YYYY-MM-DD`形式の有効な日付でなければなりません。標準の日付形式を確認します。 |
| dateRange          | dateRange: ["#startDate", "#endDate"] | 指定された範囲内の日付である必要があります。セレクタの配列`[startDateSelector, endDateSelector]`として定義します。 |
| validOption        | validOption: ["option1", "option2"] | 指定されたオプションの1つでなければなりません。許可される値の配列として定義します。 |
| checkbox           | checkbox: true               | チェックボックスはチェックされていなければなりません。チェックボックスの入力がチェックされているかを確認します。 |
| bothRequired       | bothRequired: "#confirmPassword" | 2つのフィールドが両方とも必要です。もう一方のフィールドを示すセレクタとして定義します。 |
| blockFullWidth     | blockFullWidth: true         | 全角文字の入力を防ぎます。全角のUnicode文字の入力を禁止します。 |
| blockHalfWidth     | blockHalfWidth: true         | 半角文字の入力を防ぎます。標準のASCII文字の入力を禁止します。 |

## バリデーションのタイミング

バリデーションは次のイベントで行われます：

- input: ユーザーが入力しているとき
- change: フィールドの値が変更されたとき
- submit: フォームが送信されたとき

## CSSクラス

FormRulerは次のCSSクラスを使用します：

- is-valid: バリデーションを通過したフィールドに適用されます
- is-invalid: バリデーションに失敗したフィールドに適用されます

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細についてはLICENSEファイルを参照してください。

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
