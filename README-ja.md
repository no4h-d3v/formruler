<p>
  <a href="https://github.com/no4h-d3v/formruler/blob/master/README.md">English README is here</a>
</p>

<h1>FormRuler</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.0.1-blue.svg?cacheSeconds=2592000" />
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

## 基本的な使い方

このライブラリを使用するには、以下の手順に従います：

1. jQuery と FormRuler プラグインを HTML ファイルに含めます。
2. フォーム内の各入力要素に適切な `name` 属性と` invalid-feedback` クラスを含む要素を追加します。
3. JavaScript で `formruler()` メソッドを呼び出し、バリデーションルールとメッセージを設定します。

以下は具体的な例です：

```html
<form id="myForm">
    <div class="form-group">
        <label for="username">ユーザー名</label>
        <input type="text" name="username" class="form-control">
        <div class="invalid-feedback">ここにエラーメッセージが表示されます。</div>
    </div>
    <div class="form-group">
        <label for="email">メールアドレス</label>
        <input type="email" name="email" class="form-control">
        <div class="invalid-feedback">ここにエラーメッセージが表示されます。</div>
    </div>
    <button type="submit" id="submitBtn">送信</button>
</form>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="path/to/formruler.js"></script>
<script>
$(document).ready(function() {
    $('#myForm').formruler({
        rules: {
            username: {
                required: true,
                minLength: 3,
                maxLength: 20
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: {
                required: "ユーザー名は必須です",
                minLength: "ユーザー名は3文字以上で入力してください",
                maxLength: "ユーザー名は20文字以内で入力してください"
            },
            email: {
                required: "メールアドレスは必須です",
                email: "有効なメールアドレスを入力してください"
            }
        },
        triggerButtonId: "submitBtn",
        onValid: function() {
            console.log("フォームは有効です");
            // ここでフォームの送信処理を行います
        },
        onInvalid: function() {
            console.log("フォームは無効です");
            // エラーがある場合の処理をここに記述します
        }
    });
});
</script>

```

この例では：

- フォーム内の各入力要素に `name` 属性（`username` と `email`）を設定しています。
- `rules` オブジェクト内で、各 `name` 属性に対応するバリデーションルールを定義しています。
- `messages` オブジェクト内で、各ルールに対応するエラーメッセージを定義しています。
- `triggerButtonId` で、フォーム送信を開始するボタンの ID を指定しています。
- `onValid` と `onInvalid` コールバックで、バリデーション結果に応じた処理を定義しています。

## 利用可能な設定

### 1. rules（ルール）

#### 目的
フォームの各フィールドに対して適用するバリデーションルールを定義します。これにより、ユーザーが入力したデータが期待通りの形式や条件を満たしているかを確認できます。

#### 説明
`rules`オプションは、フォームの各フィールドに対するバリデーションルールを指定するオブジェクトです。各フィールドの名前をキーとし、そのフィールドに適用するルールをオブジェクトとして値に設定します。

#### 使用例

```javascript
$('#myForm').formruler({
    rules: {
        username: {
            required: true,
            minLength: 3,
            maxLength: 20
        },
        email: {
            required: true,
            email: true
        },
        age: {
            numeric: true,
            min: 18,
            max: 100
        }
    }
});
```

#### 利用可能なルール

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
| timeRange          | 	timeRange: ["#startTime", "#endTime"] |指定された範囲内の時間である必要があります。セレクタの配列`[startTimeSelector, endTimeSelector]`として定義します。 |
| validOption        | validOption: ["option1", "option2"] | 指定されたオプションの1つでなければなりません。許可される値の配列として定義します。 |
| checkbox           | checkbox: true               | チェックボックスはチェックされていなければなりません。チェックボックスの入力がチェックされているかを確認します。 |
| blockFullWidth     | blockFullWidth: true         | 全角文字の入力を防ぎます。全角のUnicode文字の入力を禁止します。 |
| blockHalfWidth     | blockHalfWidth: true         | 半角文字の入力を防ぎます。標準のASCII文字の入力を禁止します。 |
| eitherOrBothRequired | eitherOrBothRequired: "#otherField" | 2つのフィールドの両方が空の場合はエラー、片方または両方が入力されている場合はOKです。このルールを適用するには、両方のフィールドに設定する必要があります。 |
| bothOrNoneRequired | bothOrNoneRequired: "#otherField" | 2つのフィールドの両方が空の場合はOK、片方のみ入力されている場合はエラー、両方入力されている場合はOKです。このルールを適用するには、両方のフィールドに設定する必要があります。 |

### 2. messages（メッセージ）

#### 目的
バリデーションエラーが発生した際に表示するカスタムエラーメッセージを定義します。これにより、ユーザーにより分かりやすい形でエラーを伝えることができます。

#### 説明
`messages`オプションは、各フィールドの各ルールに対するカスタムエラーメッセージを指定するオブジェクトです。`rules`オプションと同様の構造を持ちますが、値としてエラーメッセージの文字列を設定します。

#### 使用例

```javascript
$('#myForm').formruler({
    messages: {
        username: {
            required: "ユーザー名を入力してください",
            minLength: "ユーザー名は{minLength}文字以上で入力してください",
            maxLength: "ユーザー名は{maxLength}文字以下で入力してください"
        },
        email: {
            required: "メールアドレスを入力してください",
            email: "有効なメールアドレスを入力してください"
        },
        age: {
            numeric: "年齢は数字で入力してください",
            min: "{min}歳以上である必要があります",
            max: "{max}歳以下である必要があります"
        }
    }
});
```

#### 特記事項
- メッセージ内の`{minLength}`, `{maxLength}`, `{min}`, `{max}`などのプレースホルダーは、対応するルールの値に自動的に置換されます。
- カスタムメッセージが設定されていない場合は、デフォルトのエラーメッセージが使用されます。

### 3. customValidators（カスタムバリデータ）

#### 目的
標準のバリデーションルールでは対応できない、特殊なバリデーション要件を満たすためのカスタムバリデーション関数を定義します。

#### 説明
`customValidators`オプションは、独自のバリデーション関数を定義するオブジェクトです。各バリデータの名前をキーとし、対応する関数を値として設定します。

#### 使用例

```javascript
$('#myForm').formruler({
    customValidators: {
        evenNumber: function(value, input) {
            return {
                isValid: parseInt(value) % 2 === 0,
                message: "偶数を入力してください"
            };
        },
        passwordStrength: function(value, input) {
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            return {
                isValid: strongRegex.test(value),
                message: "パスワードは8文字以上で、大文字、小文字、数字、特殊文字を含む必要があります"
            };
        }
    },
    rules: {
        evenField: {
            evenNumber: true
        },
        password: {
            passwordStrength: true
        }
    }
});
```

#### 特記事項
- カスタムバリデータ関数は、入力値(`value`)とinput要素(`input`)を引数として受け取ります。
- 関数は、`isValid`（真偽値）と`message`（エラーメッセージ）を含むオブジェクトを返す必要があります。

### 4. feedbackSelectors（フィードバックセレクタ）

#### 目的
エラーメッセージを表示する要素をカスタマイズします。これにより、デフォルトの位置とは異なる場所にエラーメッセージを表示することができます。

#### 説明
`feedbackSelectors`オプションは、各フィールドのエラーメッセージを表示する要素のセレクタを指定するオブジェクトです。フィールド名をキーとし、対応するセレクタ文字列を値として設定します。

#### 使用例

```javascript
$('#myForm').formruler({
    feedbackSelectors: {
        username: "#username-error",
        email: "#email-error-container .message",
        password: ".password-feedback"
    }
});
```

#### 特記事項
- セレクタが指定されていないフィールドは、デフォルトの`.invalid-feedback`クラスを持つ兄弟要素にエラーメッセージが表示されます。
- 指定されたセレクタに対応する要素が存在しない場合、エラーメッセージは表示されません。

### 5. skipRulesIf（ルールスキップ条件）

#### 目的
特定の条件下で、一部のバリデーションルールをスキップすることができます。これは、フォームの動的な振る舞いを実現する際に特に有用です。

#### 説明
`skipRulesIf`オプションは、特定のフィールドのバリデーションルールをスキップする条件を定義するオブジェクトです。フィールド名をキーとし、スキップ条件を指定するオブジェクトを値として設定します。

#### 使用例

```javascript
$('#myForm').formruler({
    skipRulesIf: {
        address: {
            dependentId: "sameAsBilling",
            condition: "notEmpty",
            rulesToSkip: ["required", "minLength"]
        }
    }
});
```

#### 特記事項
- `dependentId`: スキップ条件の判断に使用する別のフィールドのID
- `condition`: スキップする条件（"notEmpty"または"empty"）
- `rulesToSkip`: スキップするルールの配列。"all"を指定すると全てのルールをスキップします。

### 6. triggerButtonId（トリガーボタンID）

#### 目的
フォームの送信をトリガーするボタンのIDを指定します。これにより、type="button"の要素でもフォームの送信と検証を開始することができます。

#### 説明
`triggerButtonId`オプションは、フォームの送信をトリガーするボタンのIDを指定する文字列です。

#### 使用例

```javascript
$('#myForm').formruler({
    triggerButtonId: "submitButton"
});
```

#### 特記事項
- 指定されたIDを持つボタンがクリックされると、フォームの送信イベントが発生します。
- デフォルト値は"submitBtn"です。

### 7. onValid, onInvalid（バリデーションイベントハンドラ）

#### 目的
フォームのバリデーション結果に応じて実行されるカスタム関数を定義します。これにより、バリデーション後の処理をカスタマイズすることができます。

#### 説明
- `onValid`: フォームが有効（全てのフィールドが正しく検証された）場合に呼び出される関数です。
- `onInvalid`: フォームが無効（1つ以上のフィールドでエラーが発生）の場合に呼び出される関数です。

#### 使用例

```javascript
$('#myForm').formruler({
    onValid: function() {
        console.log("フォームは有効です。送信処理を開始します。");
        // フォームデータの送信処理など
    },
    onInvalid: function() {
        console.log("フォームにエラーがあります。修正してください。");
        // エラーメッセージのスクロール表示など
    }
});
```

#### 特記事項
- これらの関数は、フォームの送信時（submitイベント）に実行されます。
- デフォルトでは、これらの関数は空の関数（何も行わない）が設定されています。

## 送信処理の挙動

### 1. 送信のトリガー

フォームの送信は以下のいずれかの方法でトリガーされます：

- `type="submit"`ボタンのクリック
- `triggerButtonId`で指定されたボタンのクリック
- フォーム要素に対する`submit()`メソッドの呼び出し

### 2. デフォルトの送信動作の防止

FormRulerは、送信イベントが発生すると以下の処理を行います：

- `event.preventDefault()`を呼び出し、ブラウザのデフォルトのフォーム送信動作を防止します。
- これにより、フォームデータは自動的にサーバーに送信されません。

### 3. バリデーションの実行

送信イベントが発生すると、FormRulerは以下の手順でバリデーションを実行します：

- フォーム内の全てのフィールドに対して、定義されたルールに基づいてバリデーションを実行します。
- エラーが検出された場合、該当フィールドにエラー表示を行います。

### 4. バリデーション結果に基づく処理

バリデーションの結果に応じて、以下のいずれかの処理が実行されます：

- バリデーション成功の場合：
   - `onValid`コールバック関数が呼び出されます。
   - フォームデータは自動的には送信されません。

- バリデーション失敗の場合：
   - `onInvalid`コールバック関数が呼び出されます。
   - フォームデータは送信されません。

### 5. カスタム送信処理

実際のフォームデータの送信は、開発者が明示的に実装する必要があります：

- 通常、`onValid`コールバック内で送信処理を実装します。
- Ajax送信や`FormData`オブジェクトを使用した非同期送信が一般的です。
- 従来の同期送信を行う場合は、`$('#myForm')[0].submit()`を使用します（`$('#myForm').submit()`は無限ループを引き起こす可能性があるため避けてください）。

### 使用例

```javascript
$('#myForm').formruler({
    // バリデーションルールなどの設定
    onValid: function() {
        console.log("バリデーション成功。フォームを送信します。");
        // Ajaxを使用したフォーム送信の例
        $.ajax({
            url: $('#myForm').attr('action'),
            method: 'POST',
            data: $('#myForm').serialize(),
        }).done(function(response) {
            console.log('送信成功:', response);
        }).fail(function(error) {
            console.error('送信失敗:', error);
        }).always(function() {
            console.log('リクエスト完了');
        });
    },
    onInvalid: function() {
        console.log("バリデーション失敗。エラーを確認してください。");
    }
});
```

## 処理の流れ

1. **初期化**: `formruler()` メソッドが呼び出されると、プラグインは以下の処理を行います：
   - 指定されたフォーム内の `.form-control:not(:disabled), .form-check-input:not(:disabled)` にマッチする要素を対象として特定します。
   - これらの要素に対して、"input" と "change" イベントのリスナーを設定します。
   - `triggerButtonId` で指定されたボタンに "click" イベントリスナーを設定します。
   - フォーム全体に "submit" イベントリスナーを設定します。

2. **入力検証**: 
   - ユーザーがフォームフィールドに入力するたびに（`input`イベント）、または値が変更されるたびに（`change` イベント）、プラグインは該当する `name` 属性に対応するルールに基づいて検証を行います。

3. **エラー表示**: 
   - 入力が無効な場合、入力要素に "is-invalid" クラスが追加され、直後の `.invalid-feedback` クラスを持つ要素にエラーメッセージが表示されます。
   - カスタムフィードバックセレクタが指定されている場合は、そのセレクタに一致する要素にエラーメッセージが表示されます。
   - 入力が有効な場合、エラー表示がクリアされます。

4. **フォーム送信**: 送信ボタンがクリックされると：
   - プラグインはデフォルトのフォーム送信を防ぎます（`event.preventDefault()`）。
   - プラグインは、フォーム内のすべての入力フィールド（`.form-control:not(:disabled), .form-check-input:not(:disabled)` にマッチする要素）に対して `validateField` 関数を呼び出し、各フィールドのバリデーションを行います。
   - バリデーションの結果、すべてのフィールドが有効な場合、`onValid` コールバックを呼び出します。
   - いずれかのフィールドが無効な場合、`onInvalid` コールバックを呼び出します。

## バリデーションのタイミング

FormRulerは以下のタイミングでバリデーションを実行します：

1. **フォーム送信時**:
   - フォームが送信されると、全てのフィールドに対してバリデーションが実行されます。

2. **フィールドの値変更時**:
   - 各フィールドに対して、`input`イベントと`change`イベントのリスナーが設定されています。
   - ユーザーがフィールドの値を変更すると、そのフィールドに対してリアルタイムでバリデーションが実行されます。

3. **依存フィールドの変更時**:
   - `skipRulesIf`オプションで依存関係が設定されている場合、依存フィールドの値が変更されると、関連するフィールドのバリデーションが再実行されます。

## CSSクラス

### CSSクラスの適用

バリデーション結果に基づいて、以下のCSSクラスが適用されます：

1. **is-invalid**:
   - バリデーションが失敗したフィールドに適用されます。
   - 例: `<input class="form-control is-invalid" ...>`

2. **is-valid**:
   - バリデーションが成功したフィールドに適用されます。
   - 例: `<input class="form-control is-valid" ...>`

3. **invalid-feedback**:
   - エラーメッセージを表示する要素に使用されます。
    - この クラスは自動的には適用されません。HTMLに予め記述しておく必要があります。
    - 
    - 例: `<div class="invalid-feedback">ここにエラーメッセージが表示されます。</div>`

### CSSクラスの動作

1. **初期状態**:
   - フォームが初期化された時点では、特別なCSSクラスは適用されません。

2. **バリデーション後**:
   - バリデーションが実行されると、結果に応じて`is-invalid`または`is-valid`クラスが適用されます。
   - エラーがある場合、対応する`invalid-feedback`要素が表示されます。

3. **値の変更時**:
   - フィールドの値が変更されるたびに、そのフィールドのバリデーションが再実行され、CSSクラスが更新されます。

4. **クラスの切り替え**:
   - バリデーション結果が変わると、`is-invalid`と`is-valid`クラスが適切に切り替えられます。

### CSSのカスタマイズ

FormRulerは、Bootstrap 4/5と互換性のあるCSSクラスを使用しています。以下のようにカスタマイズが可能です：

```css
/* エラー時のスタイル */
.is-invalid {
    border-color: #dc3545;
}

/* 成功時のスタイル */
.is-valid {
    border-color: #28a745;
}

/* エラーメッセージのスタイル */
.invalid-feedback {
    display: none;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}

/* エラー時にエラーメッセージを表示 */
.is-invalid ~ .invalid-feedback {
    display: block;
}
```

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細についてはLICENSEファイルを参照してください。

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
