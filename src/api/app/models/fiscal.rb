class Fiscal < ApplicationRecord
   self.table_name = 'data_school_fiscal'
   belongs_to :School, :foreign_key => [:state_lea_id, :state_school_id]
end
