"""added age, lifter, color column

Revision ID: 33fbf00e344c
Revises: fbe989900dc7
Create Date: 2023-10-07 13:15:33.689192

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33fbf00e344c'
down_revision = 'fbe989900dc7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('lifter', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('color', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('age', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('age')
        batch_op.drop_column('color')
        batch_op.drop_column('lifter')

    # ### end Alembic commands ###
