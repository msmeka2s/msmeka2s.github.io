(module
 (table 0 anyfunc)
 (memory $0 1)
 (export "memory" (memory $0))
 (export "gcd" (func $gcd))
 (func $gcd (; 0 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $1)
    )
   )
   (loop $label$1
    (set_local $1
     (i32.rem_s
      (get_local $0)
      (tee_local $2
       (get_local $1)
      )
     )
    )
    (set_local $0
     (get_local $2)
    )
    (br_if $label$1
     (get_local $1)
    )
   )
   (return
    (get_local $2)
   )
  )
  (get_local $0)
 )
)
