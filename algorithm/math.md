# Math

## GCD

```typescript
function gcd(a:number,b:number){
    if(b === 0){
        return a;
    }
    return gcd(b,a%b)
}
```

## LCM

```typescript
function lcm(a:number,b:number){
    return a*b/gcd(a,b)
}
```

## 同余

* (a+b)%M === ( (a%M) + (b%M) )%M
* (a*b)%M === ( (a%M)* (b%M) )%M
* (a-b)%M === ( (a%M) - (b%M) + M ) %M
