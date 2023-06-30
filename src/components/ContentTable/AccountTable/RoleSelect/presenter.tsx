// import layer
import { FC, useState } from 'react';
import { Box, FlexProps, HStack, Select } from '@chakra-ui/react';
import { WideButton } from '@/components/Button/WideButton';
import Subtitle from '../Subtitle';
import { useAccountStore, selectAccountItem } from '@/features/account';

// type layer
export type StyleProps = FlexProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  const account = useAccountStore(selectAccountItem);

  const [role, setRole] = useState(account.role);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleUpdate = () => {
    updateAccountRole(role);
  };

  return (
    <Box mb={`${50 / 19.2}vw`}>
      <Subtitle title={`権限`} />
      <HStack mb={`${30 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
        <Box
          w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}
        >{`ユーザ権限`}</Box>
        <Select
          w={{ lg: `${110 / 10.2}vw`, xl: `22vw` }}
          borderRadius={'none'}
          fontSize={`${16 / 19.2}vw`}
          value={role}
          onChange={handleRoleChange}
        >
          <option value="writer">記者</option>
          <option value="editor">編集者</option>
        </Select>
      </HStack>
      <WideButton
        text={`変更する`}
        w={`${200 / 19.2}vw`}
        onClick={handleUpdate}
      />
    </Box>
  );
};

function updateAccountRole(newRole: string) {
  // DBへの更新処理を書く
}
