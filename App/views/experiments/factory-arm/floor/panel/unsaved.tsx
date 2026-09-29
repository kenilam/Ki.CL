import React from 'react';

// Libraries
import { useForm } from 'react-hook-form';

// Components
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Layout,
  SheetFooter,
} from '@/components';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

type Values = { name: string };

/**
 * Shows once the floor differs from the simulation it started from: a
 * queue changed, a pallet taken away, a capacity set. It saves the floor as
 * it stands as a new simulation, under the name given.
 */
const Unsaved: React.FunctionComponent = () => {
  const { edited, next, save } = useHub();
  const form = useForm<Values>({ defaultValues: { name: '' } });

  if (!edited) {
    return null;
  }

  const submit = form.handleSubmit(({ name }) => {
    save(name);
    form.reset();
  });

  return (
    <SheetFooter is='footer'>
      <Layout
        alignItems='center'
        autoFlow='column'
        frames='1fr--max-content'
        gap='narrow'
      >
        <Form {...form} aria-label={COPY.panel.unsaved} onSubmit={submit}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    aria-label={COPY.panel.name}
                    placeholder={next}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' size='small'>
            {COPY.panel.save}
          </Button>
        </Form>
      </Layout>
    </SheetFooter>
  );
};

export { Unsaved };
