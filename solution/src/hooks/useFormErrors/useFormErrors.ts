import { useEffect, useMemo, useState } from "react";
import { forkJoin, from } from "rxjs";
import _ from "lodash";
import { useSubscription } from "observable-hooks";

export const validate = (...funcs: any) => {
  return async (initialValue: any) => {
    return funcs.reduce(async (previousValue: any, func: any) => {
      // Await the resolution of the previous value before passing it to the next function
      return func(await previousValue);
    }, initialValue);
  };
};

export const useFormErrors = (
  formData: Record<string, any>,
  errorValidatorMap: any
) => {
  const [errors, setErrors] = useState({});
  const errors$ = useMemo(() => {
    const validators = _.reduce(
      errorValidatorMap,
      (accum, validator, key) => {
        accum[key] = from(
          Promise.resolve(
            validator({ formData, value: _.get(formData, key, "") })
          )
        );
        return accum
      },
      {} as any
    );
    console.log({validators})
    return forkJoin(validators);
  }, [formData]);

  useSubscription(errors$, (errs: any) => {
    setErrors(
      _.reduce(
        errs,
        (accum, iter, key) => {
          if (iter.error) {
            accum[key] = iter.error;
          }
          return accum;
        },
        {} as any
      )
    );
  });

  return { errors };
};
