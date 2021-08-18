# Buffer Structs

## Formato

```c

```

Para cada campo da struct deve-se reservar um bit no começo do buffer para armazenar se o campo está nulo.

_Buffer (1 Byte)_

| a   | b   | c   | -   | -   | -   | -   | -   |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 1   | 0   | 0   | 0   | 0   | 0   |
