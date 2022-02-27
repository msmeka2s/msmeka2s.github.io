(module
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "isPrime" (func $isPrime))
 (func $isPrime (; 0 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_u
      (get_local $0)
      (i32.const 2)
     )
    )
    (set_local $1
     (i32.const 1)
    )
    (br_if $label$0
     (i32.lt_u
      (get_local $0)
      (i32.const 4)
     )
    )
    (set_local $1
     (i32.const 2)
    )
    (loop $label$2
     (br_if $label$1
      (i32.eqz
       (i32.rem_u
        (get_local $0)
        (get_local $1)
       )
      )
     )
     (br_if $label$2
      (i32.le_u
       (i32.mul
        (tee_local $1
         (i32.add
          (get_local $1)
          (i32.const 1)
         )
        )
        (get_local $1)
       )
       (get_local $0)
      )
     )
    )
    (return
     (i32.const 1)
    )
   )
   (set_local $1
    (i32.const 0)
   )
  )
  (get_local $1)
 )
)
