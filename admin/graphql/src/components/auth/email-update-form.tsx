import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import pick from 'lodash/pick';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useUpdateUserEmailMutation } from '@/graphql/user.graphql';
type FormValues = {
  email: string;
};

export default function EmailUpdateForm({ me }: any) {
  const { t } = useTranslation();
  const [updateUserEmailMutation, { loading }] = useUpdateUserEmailMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(me && pick(me, ['email'])),
    },
  });

  async function onSubmit(values: FormValues) {
    const { email } = values;
    try {
      const { data } = await updateUserEmailMutation({
        variables: {
          input: {
            email,
          },
        },
      });
      console.log(data);
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8'>
        <Description
          title={t('common:text-email')}
          details={t('form:email-change-helper-text')}
          className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
        />

        <Card className='mb-5 w-full sm:w-8/12 md:w-2/3'>
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            error={t(errors.email?.message!)}
            variant='outline'
            className='mb-5'
          />
        </Card>

        <div className='w-full text-end'>
          <Button loading={loading} disabled={loading}>
            {t('form:button-label-save')}
          </Button>
        </div>
      </div>
    </form>
  );
}
